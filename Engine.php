<?php
namespace Acms\Plugins\Zoho;

use DB;
use SQL;
use Field;
use Field_Validation;
use CristianPontes\ZohoCRMClient\ZohoCRMClient;

class Engine
{
    /**
     * Engine constructor.
     * @param string $code
     */
    public function __construct($code, $module)
    {
        $field = $this->loadFrom($code);
        if (empty($field)) {
            throw new \RuntimeException('Not Found Form.');
        }
        $this->formField = $field;
        $this->module = $module;
        $this->code = $code;
        $this->config = $field->getChild('mail');
    }
    /**
     * @param string $code
     * @return bool|Field
     */
    protected function loadFrom($code)
    {
        $DB = DB::singleton(dsn());
        $SQL = SQL::newSelect('form');
        $SQL->addWhereOpr('form_code', $code);
        $row = $DB->query($SQL->get(dsn()), 'row');
        if (!$row) {
            return false;
        }
        $Form = new Field();
        $Form->set('code', $row['form_code']);
        $Form->set('name', $row['form_name']);
        $Form->set('scope', $row['form_scope']);
        $Form->set('log', $row['form_log']);
        $Form->overload(unserialize($row['form_data']), true);
        return $Form;
    }
    /**
     * Send
     */
    public function send()
    {
        $id = $this->module->Post->get('id');
        $zohoInsertScopes = array();
        $zohoUpdateScopes = array();
        $field = $this->module->Post->getChild('field');
        $uniqueKey = $this->config->get('zoho_form_unique_key');
        $accessToken = config('zoho_access_token');
        $zohoInsertScopes = $this->config->get('zoho_form_insert_scope');
        $zohoUpdateScopes = $this->config->get('zoho_form_update_scope');
        $fieldKeys = $this->config->getArray('zoho_field_key');
        $this->field = $field;
        $this->accessToken = $accessToken;
        $this->scopePool = array();
        if (!$uniqueKey) {
            $uniqueKey = 'Email';
        }
        if ($zohoInsertScopes) {
            $zohoInsertScopes = explode(',', $zohoInsertScopes);
        }
        if ($zohoUpdateScopes) {
            $zohoUpdateScopes = explode(',', $zohoUpdateScopes);
        }

        if (!$zohoInsertScopes && !$zohoUpdateScopes) {
            return;
        }

        foreach ($zohoInsertScopes as $zohoScope) {
            $client = new ZohoCRMClient($zohoScope, $accessToken);
            $zohoInsertConfig = array();
            foreach ($fieldKeys as $i => $type) {
                $canInsert = $this->config->get('zoho_field_insert', '', $i);
                if ($canInsert !== 'true') {
                    continue;
                }
                $key = $this->config->get('zoho_field_cms_key', '', $i);
                $scopes = $this->config->get('zoho_field_scope', '', $i);
                $scopes = explode(',', $scopes);
                foreach ($scopes as $scope) {
                    $zohoInsertConfig[$type] = implode(";", $field->getArray($key));
                }
            }
            //すでに顧客に存在するときは追加しない
            if ($zohoScope === 'Leads' && isset($zohoInsertConfig[$uniqueKey])) {
                $finds = null;
                try {
                    $getClient = new ZohoCRMClient('Contacts', $accessToken);
                    $finds = $getClient->searchRecords()
                    ->where($uniqueKey, $zohoInsertConfig[$uniqueKey])
                    ->request();
                } catch (\Exception $e) {
                    throw $e;
                }
                if ($finds) {
                    continue;
                }
            }

            try {
                $updated = $client->insertRecords()
                ->setRecords(array(
                    $zohoInsertConfig
                ))
                ->onDuplicateError()
                ->triggerWorkflow()
                ->request();
                if ($updated && isset($updated[1])) {
                    $this->scopePool[$zohoScope] = $updated[1]->id;
                    if (isset($zohoInsertConfig['Note Title']) && isset($zohoInsertConfig['Note Content'])) {
                        $relatedFieldId = strtoupper(rtrim($zohoScope, 's')).'ID';
                        $this->addNote($zohoInsertConfig['Note Title'], $zohoInsertConfig['Note Content'], $updated[1]->id);
                    }
                }
            } catch (\Exception $e) {
                throw $e;
            }
        }


        foreach ($zohoUpdateScopes as $zohoScope) {
            $zohoUpdateConfig = array();
            $getClient = new ZohoCRMClient($zohoScope, $accessToken);
            foreach ($fieldKeys as $i => $type) {
                $canUpdate = $this->config->get('zoho_field_update', '', $i);
                if ($canUpdate !== 'true') {
                    continue;
                }
                $key = $this->config->get('zoho_field_cms_key', '', $i);
                $scopes = $this->config->get('zoho_field_scope', '', $i);
                $scopes = explode(',', $scopes);
                foreach ($scopes as $scope) {
                    if ($scope === $zohoScope) {
                        $updateValue = implode(";", $field->getArray($key));
                        if ($updateValue) {
                            $zohoUpdateConfig[$type] = $updateValue;
                        }
                    }
                }
            }
            try {
                $targets = $getClient->searchRecords()
                ->where($uniqueKey, $zohoUpdateConfig[$uniqueKey])
                ->request();
            } catch (\Exception $e) {
                throw $e;
            }
            $client = new ZohoCRMClient($zohoScope, $accessToken);
            $temp = array_values($targets);
            $target = $temp[0];
            $fieldId = strtoupper(rtrim($zohoScope, 's')).'ID';
            $temp2 = $target->getData();
            $zohoUpdateConfig['Id'] = $temp2[$fieldId];
            if ($zohoUpdateConfig['Id']) {
                $this->scopePool[$zohoScope] = $zohoUpdateConfig['Id'];
            }
            try {
                $client->updateRecords()
                ->addRecord($zohoUpdateConfig)
                ->triggerWorkflow()
                ->request();
            } catch (\Exception $e) {
                throw $e;
            }
        }

        $this->updateRelatedRecords();
    }

    private function addNote($noteTitle, $noteContent, $id)
    {
        $client = new ZohoCRMClient('Notes', $this->accessToken);
        $updated = $client->insertRecords()
        ->setRecords(array(
            array(
            'Note Title' => $noteTitle,
            'Note Content' => $noteContent,
            'entityId' => $id
            )
        ))
        ->onDuplicateError()
        ->triggerWorkflow()
        ->request();
    }

    private function updateRelatedRecords()
    {
        $zohoRelatedScopes = $this->config->getArray('zoho_related_scope');

        foreach ($zohoRelatedScopes as $i => $zohoRelatedScope) {
            $zohoRelatedTargetScope = $this->config->get('zoho_related_target_scope', '', $i);
            $lookupId = $this->config->get('zoho_related_lookup_id', '', $i);
            $targetId = null;
            $id = null;
            if (isset($this->scopePool[$zohoRelatedTargetScope])) {
                $targetId = $this->scopePool[$zohoRelatedTargetScope];
            }
            if (isset($this->scopePool[$zohoRelatedScope])) {
                $id = $this->scopePool[$zohoRelatedScope];
            }

            if (!$id || !$targetId) {
                continue;
            }

            try {
                $client = new ZohoCRMClient($zohoRelatedScope, $this->accessToken);
                if ($lookupId) {
                    $lookupId = $lookupId.'_ID';
                    $client->updateRecords()
                    ->addRecord(array(
                        'Id' => $id,
                        $lookupId => $targetId
                    ))
                    ->triggerWorkflow()
                    ->request();
                } else {
                    $fieldId = strtoupper(rtrim($zohoRelatedTargetScope, 's')).'ID';
                    $client->updateRelatedRecords()
                    ->id($id)
                    ->relatedModule($zohoRelatedTargetScope)
                    ->addRecord(array(
                        $fieldId => $targetId
                    ))
                    ->request();
                }
            } catch (\Exception $e) {
                throw $e;
            }
        }
    }
}
