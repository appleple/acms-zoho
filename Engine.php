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
        $this->id = $this->module->Post->get('id');
        $this->field = $this->module->Post->getChild('field');
        $this->accessToken = config('zoho_access_token');
        $this->records = array();
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
        $zohoScopeGroup = $this->config->getArray('@zoho_form_group');
        foreach ($zohoScopeGroup as $i => $zohoScopeItem) {
            $zohoInsertScopes = array();
            $zohoUpdateScopes = array();
            $uniqueKey = $this->config->get('zoho_form_unique_key', '', $i);
            $zohoInsertScopes = $this->config->get('zoho_form_insert_scope', '', $i);
            $zohoUpdateScopes = $this->config->get('zoho_form_update_scope', '', $i);
            $fieldKeys = $this->config->getArray('zoho_field_key');
            if (!$zohoInsertScopes && !$zohoUpdateScopes) {
                continue;
            }
            if (!$uniqueKey) {
                $uniqueKey = 'Email';
            }
            if ($zohoInsertScopes) {
                $zohoInsertScopes = explode(',', $zohoInsertScopes);
            }
            if ($zohoUpdateScopes) {
                $zohoUpdateScopes = explode(',', $zohoUpdateScopes);
            }

            $this->insertRecord($zohoInsertScopes, $fieldKeys, $uniqueKey);
            $this->updateRecord($zohoUpdateScopes, $fieldKeys, $uniqueKey);
        }
        $this->updateRelatedRecords();
    }

    private function getMaxKey($keys)
    {
        $max = 1;
        $field = $this->field;
        foreach($keys as $key) {
            $arr = $field->getArray($key);
            $cnt = count($arr);
            if ($cnt > $max) {
                $max = $cnt;
            }
        }
        return $max;
    }

    private function getGroupArray($zohoScope)
    {
        $keys = $this->config->getArray('zoho_field_cms_key');
        $field = $this->field;
        foreach ($keys as $i => $key) {
            $scopes = $this->config->get('zoho_field_scope', '', $i);
            $scopes = explode(',', $scopes);
            foreach ($scopes as $scope) {
                if ($scope === $zohoScope) {
                    if (isset($key) && isset($key[0]) && $key[0] === '@') {
                        return $field->getArray($key);
                    }
                }
            }
        }
        return null;
    }

    private function removeCompareField($fields, $scope)
    {
        $zohoRelatedScopes = $this->config->getArray('zoho_related_scope');
        $arr = array();
        foreach ($fields as $key => $field) {
            $flag = true;
            foreach ($zohoRelatedScopes as $i => $zohoRelatedScope) {
                $zohoRelatedTargetScope = $this->config->get('zoho_related_target_scope', '', $i);
                $compareField = $this->config->get('zoho_related_compare_field', '', $i);
                if ($key === $compareField && $scope === $zohoRelatedScope) {
                    $flag = false;
                }
            }
            if ($flag) {
                $arr[$key] = $field;
            }
        }
        return $arr;
    }

    private function insertRecord($zohoInsertScopes, $fieldKeys, $uniqueKey)
    {
        $accessToken = $this->accessToken;
        $field = $this->field;
        if (!$zohoInsertScopes) {
            return;
        }
        foreach ($zohoInsertScopes as $zohoScope) {
            $client = new ZohoCRMClient($zohoScope, $accessToken);
            $uniqueValue = false;
            $length = 1;
            $groupArr = $this->getGroupArray($zohoScope);
            if ($groupArr) {
                $length = $this->getMaxKey($groupArr);
            }
            $records = array();
            $saves = array();
            for ($cnt = 0; $cnt < $length; $cnt++) {
                $zohoInsertConfig = array();
                foreach ($fieldKeys as $i => $type) {
                    $key = $this->config->get('zoho_field_cms_key', '', $i);
                    $scopes = $this->config->get('zoho_field_scope', '', $i);
                    $scopes = explode(',', $scopes);
                    if ($type === $uniqueKey) {
                        $uniqueValue = $field->get($key);
                    }
                    $canInsert = $this->config->get('zoho_field_insert', '', $i);
                    if ($canInsert !== 'true') {
                        continue;
                    }
                    foreach ($scopes as $scope) {
                        if ($scope === $zohoScope) {
                            if ($groupArr && in_array($key, $groupArr)) {
                                $zohoInsertConfig[$type] = $field->get($key, '', $cnt);
                            } else {
                                $zohoInsertConfig[$type] = implode(";", $field->getArray($key));
                            }
                        }
                    }
                }
                $records[] = $this->removeCompareField($zohoInsertConfig,$zohoScope);
                $saves[] = $zohoInsertConfig;
            }
            //すでに顧客に存在するときは追加しない
            if ($zohoScope === 'Leads' && $uniqueValue) {
                $finds = null;
                try {
                    $getClient = new ZohoCRMClient('Contacts', $accessToken);
                    $finds = $getClient->searchRecords()
                    ->where($uniqueKey, $uniqueValue)
                    ->request();
                } catch (\Exception $e) {
                }
                if ($finds) {
                    continue;
                }
            }

            try {
                $updates = $client->insertRecords()
                ->setRecords($records)
                ->onDuplicateError()
                ->triggerWorkflow()
                ->request();
                foreach ($updates as $i => $update) {
                    if (isset($zohoInsertConfig['Note Title']) && isset($zohoInsertConfig['Note Content'])) {
                        $relatedFieldId = strtoupper(rtrim($zohoScope, 's')).'ID';
                        $this->addNote($zohoInsertConfig['Note Title'], $zohoInsertConfig['Note Content'], $updated[$i]->id);
                    }

                    $this->records[] = array_merge(array(
                        "scope" => $zohoScope,
                        "id" => $update->id
                    ), $saves[$i - 1]);

                }
            } catch (\Exception $e) {
            }
        }
    }

    private function updateRecord($zohoUpdateScopes, $fieldKeys, $uniqueKey)
    {
        $accessToken = $this->accessToken;
        $field = $this->field;
        if (!$zohoUpdateScopes) {
            return;
        }
        foreach ($zohoUpdateScopes as $zohoScope) {
            $getClient = new ZohoCRMClient($zohoScope, $accessToken);
            $uniqueValue = false;
            $length = 1;
            $groupArr = $this->getGroupArray($zohoScope);
            if ($groupArr) {
                $length = $this->getMaxKey($groupArr);
            }
            $records = array();
            $saves = array();
            for ($cnt = 0; $cnt < $length; $cnt++) {
                $zohoUpdateConfig = array();
                foreach ($fieldKeys as $i => $type) {
                    $key = $this->config->get('zoho_field_cms_key', '', $i);
                    $scopes = $this->config->get('zoho_field_scope', '', $i);
                    $scopes = explode(',', $scopes);
                    if ($type === $uniqueKey) {
                        $uniqueValue = $field->get($key);
                    }
                    $canUpdate = $this->config->get('zoho_field_update', '', $i);
                    if ($canUpdate !== 'true') {
                        continue;
                    }
                    foreach ($scopes as $scope) {
                        if ($scope === $zohoScope) {
                            if ($groupArr && in_array($key, $groupArr)) {
                                $zohoUpdateConfig[$type] = $field->get($key, '', $cnt);
                            } else {
                                $zohoUpdateConfig[$type] = implode(";", $field->getArray($key));
                            }
                        }
                    }
                }
                if ($uniqueValue) {
                    try {
                        $targets = $getClient->searchRecords()
                        ->where($uniqueKey, $uniqueValue)
                        ->request();
                    } catch (\Exception $e) {
                    }
                }
                if (!isset($targets)) {
                    continue;
                }
                $client = new ZohoCRMClient($zohoScope, $accessToken);
                $temp = array_values($targets);
                $target = $temp[0];
                $fieldId = strtoupper(rtrim($zohoScope, 's')).'ID';
                $temp2 = $target->getData();
                $zohoUpdateConfig['Id'] = $temp2[$fieldId];
                $records[] = $this->removeCompareField($zohoUpdateConfig, $zohoScope);
                if ($zohoUpdateConfig['Id']) {
                    $this->records[] = array_merge(array(
                        "scope" => $zohoScope,
                        "id" => $zohoUpdateConfig['Id']
                    ), $zohoUpdateConfig);
                }
            }
            try {
                $client->updateRecords()
                ->setRecords($records)
                ->triggerWorkflow()
                ->request();
            } catch (\Exception $e) {
            }
        }
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
        $records = $this->records;
        foreach ($zohoRelatedScopes as $i => $zohoRelatedScope) {
            $zohoRelatedTargetScope = $this->config->get('zoho_related_target_scope', '', $i);
            $lookupId = $this->config->get('zoho_related_lookup_id', '', $i);
            $compareField = $this->config->get('zoho_related_compare_field', '', $i);

            $targets = array_filter($records, function($item) use ($zohoRelatedTargetScope) {
                return $item['scope'] === $zohoRelatedTargetScope;
            });

            $items = array_filter($records, function($item) use ($zohoRelatedScope) {
                return $item['scope'] === $zohoRelatedScope;
            });

            if (!count($targets) || !count($items)) {
                continue;
            }

            foreach ($targets as $target) {
                foreach ($items as $item) {
                    $compareValues = $item[$compareField];
                    $compareValues = explode(';',$compareValues);
                    foreach ($compareValues as $compareValue) {
                        if ($compareValue === $target[$compareField]) {
                            $client = new ZohoCRMClient($zohoRelatedScope, $this->accessToken);
                            $targetId = $target['id'];
                            $id = $item['id'];
                            $lookup = $lookupId.'_ID';
                            $result = $client->updateRecords()
                            ->addRecord(array(
                                'Id' => $id,
                                $lookup => $targetId
                            ))
                            ->triggerWorkflow()
                            ->request();
                        }
                    }
                }
            }
        }
    }
}
