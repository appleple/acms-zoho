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
        $records = $this->makeRecords();
        $records = $this->addFieldsToRecords($records);
        $this->insertRecords($this->getRecordsByType($records, 'insert'));
        $this->updateRecords($this->getRecordsByType($records, 'update'));
        $this->updateRelatedRecords();
    }

    /**
     * make scope list
     */
    private function makeRecords()
    {
        $zohoScopeGroup = $this->config->getArray('@zoho_form_group');
        $records = array();
        foreach ($zohoScopeGroup as $i => $zohoScopeItem) {
            $insertScopes = array();
            $updateScopes = array();
            $zohoInsertScope = $this->config->get('zoho_form_insert_scope', '', $i);
            $zohoUpdateScope = $this->config->get('zoho_form_update_scope', '', $i);
            $uniqueKey = $this->config->get('zoho_form_unique_key', '', $i);
            if ($zohoInsertScope) {
                $insertScopes = explode(',', $zohoInsertScope);
            }
            if ($zohoUpdateScope) {
                $updateScopes = explode(',', $zohoUpdateScope);
            }
            if (!$uniqueKey) {
                $uniqueKey = 'Email';
            }
            foreach ($insertScopes as $insertScope) {
                $records[] = array(
                    'scope' => $insertScope,
                    'uniqueKey' => $uniqueKey,
                    'field' => array(),
                    'type' => 'insert'
                );
            }
            foreach ($updateScopes as $updateScope) {
                $records[] = array(
                    'scope' => $updateScope,
                    'uniqueKey' => $uniqueKey,
                    'field' => array(),
                    'type' => 'update'
                );
            }
        }
        return $records;
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

    private function getGroupArray($record)
    {
        $zohoScope = $record['scope'];
        $type = $record['type'];
        $field = $this->field;
        $keys = $this->config->getArray('zoho_field_cms_key');
        foreach ($keys as $i => $key) {
            $scopes = $this->config->get('zoho_field_scope', '', $i);
            $insert = $this->config->get('zoho_field_insert', '', $i);
            $update = $this->config->get('zoho_field_update', '', $i);
            if ($type === 'insert' && !$insert) {
                continue;
            }
            if ($type === 'update' && !$update) {
                continue;
            }
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

    private function addFieldsToRecords($records)
    {
        $field = $this->field;
        $fieldKeys = $this->config->getArray('zoho_field_key');
        $attachedRecords = array();
        foreach ($records as $record) {
            $newRecord = array_merge(array(), $record);
            $fields = array();
            $length = 1;
            $groupArr = $this->getGroupArray($record);
            if ($groupArr) {
                $length = $this->getMaxKey($groupArr);
            }

            for ($cnt = 0; $cnt < $length; $cnt++) {
                $item = array();
                foreach ($fieldKeys as $i => $fieldKey) {
                    $key = $this->config->get('zoho_field_cms_key', '', $i);
                    $scopes = $this->config->get('zoho_field_scope', '', $i);
                    $scopes = explode(',', $scopes);
                    $canInsert = $this->config->get('zoho_field_insert', '', $i);
                    $canUpdate = $this->config->get('zoho_field_update', '', $i);
                    foreach ($scopes as $scope) {
                        if ($record['scope'] === $scope) {
                            if (($record['type'] === 'insert' && $canInsert)
                            || ($record['type'] === 'update' && $canUpdate)) {
                                if ($groupArr && in_array($key, $groupArr)) {
                                    $item[$fieldKey] = $field->get($key, '', $cnt);
                                } else {
                                    $item[$fieldKey] = implode(";", $field->getArray($key));
                                }
                            }
                        }
                    }
                }
                $fields[] = $item;
            }
            $newRecord['field'] = $fields;
            $attachedRecords[] = $newRecord;
        }
        return $attachedRecords;
    }

    private function getRecordsByType($records, $type)
    {
        return array_filter($records, function($record) use ($type) {
            return $record['type'] === $type;
        });
    }

    private function getFieldsWhereNotExistInContact($fields, $scope, $uniqueKey)
    {
        $newFields = array();
        foreach ($fields as $field) {
            $uniqueValue = $field[$uniqueKey];
            if ($scope === 'Leads' && $uniqueValue) {
                try {
                    $getClient = new ZohoCRMClient('Contacts', $accessToken);
                    $finds = $getClient->searchRecords()
                    ->where($uniqueKey, $uniqueValue)
                    ->request();
                } catch (\Exception $e) {
                }
                if ($finds) {
                    continue;
                } else {
                    $newFields[] = $field;
                }
            }
            $newFields[] = $field;
        }
        return $newFields;
    }

    private function removeCompareField($items, $scope)
    {
        $newFields = array();
        $zohoRelatedScopes = $this->config->getArray('zoho_related_scope');
        foreach ($items as $item) {
            $arr = array();
            foreach ($item as $key => $field) {
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
            $newFields[] = $arr;
        }
        return $newFields;
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

    private function addRecordIdToFields ($fields, $scope, $uniqueKey)
    {
        $accessToken = $this->accessToken;
        $newFields = array();
        foreach ($fields as $field) {
            $uniqueValue = $field[$uniqueKey];
            $client = new ZohoCRMClient($scope, $accessToken);
            try {
                $targets = $client->searchRecords()
                ->where($uniqueKey, $uniqueValue)
                ->request();
            } catch (\Exception $e) {
            }
            $temp = array_values($targets);
            $target = $temp[0];
            $fieldId = strtoupper(rtrim($scope, 's')).'ID';
            $temp2 = $target->getData();
            $newFields[] = array_merge($field, array(
                'Id' => $temp2[$fieldId]
            ));
        }
        return $newFields;
    }

    private function insertRecords($records)
    {
        $accessToken = $this->accessToken;
        foreach ($records as $record) {
            $scope = $record['scope'];
            $uniqueKey = $record['uniqueKey'];
            $fields = $record['field'];
            $saves = $this->getFieldsWhereNotExistInContact($fields, $scope, $uniqueKey);
            $fields = $this->removeCompareField($saves, $scope);
            try {
                $client = new ZohoCRMClient($scope, $accessToken);
                $updates = $client->insertRecords()
                ->setRecords($fields)
                ->onDuplicateError()
                ->triggerWorkflow()
                ->request();
                foreach ($updates as $i => $update) {
                    $field = $saves[$i - 1];
                    if (isset($field['Note Title']) && isset($field['Note Content'])) {
                        $relatedFieldId = strtoupper(rtrim($scope, 's')).'ID';
                        $this->addNote($field['Note Title'], $field['Note Content'], $updated[$i]->id);
                    }
                    $this->records[] = array_merge(array(
                        "scope" => $scope,
                        "id" => $update->id
                    ), $field);
                }
            } catch (\Exception $e) {
            }
        }
    }

    private function updateRecords($records)
    {
        $accessToken = $this->accessToken;
        foreach ($records as $record) {
            $scope = $record['scope'];
            $uniqueKey = $record['uniqueKey'];
            $fields = $record['field'];
            $saves = $this->addRecordIdToFields($fields, $scope, $uniqueKey);
            $fields = $this->removeCompareField($saves, $scope);
            try {
                $client = new ZohoCRMClient($scope, $accessToken);
                $updates = $client->updateRecords()
                ->setRecords($fields)
                ->triggerWorkflow()
                ->request();
                foreach ($updates as $i => $update) {
                    $field = $saves[$i - 1];
                    if (isset($field['Note Title']) && isset($field['Note Content'])) {
                        $relatedFieldId = strtoupper(rtrim($scope, 's')).'ID';
                        $this->addNote($field['Note Title'], $field['Note Content'], $updated[$i]->id);
                    }
                    $this->records[] = array_merge(array(
                        "scope" => $scope,
                        "id" => $update->id
                    ), $field);
                }
            } catch (\Exception $e) {
            }
        }
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
                    $compareValue = $item[$compareField];
                    if ($compareValue === $target[$compareField]) {
                        $client = new ZohoCRMClient($zohoRelatedScope, $this->accessToken);
                        $targetId = $target['id'];
                        $id = $item['id'];
                        $lookup = $lookupId.'_ID';
                        try {
                            $client->updateRecords()
                            ->addRecord(array(
                                'Id' => $id,
                                $lookup => $targetId
                            ))
                            ->triggerWorkflow()
                            ->request();
                        } catch (\Exception $e) {
                        }
                    }
                }
            }
        }
    }
}
