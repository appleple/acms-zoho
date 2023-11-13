<?php

namespace Acms\Plugins\Zoho;

use Field;
use Config;
use App;
use Common;

use ZCRMModule;
use ZCRMRecord;
use ZCRMRestClient;
use ZCRMNote;
use ZCRMJunctionRecord;
use Acms\Plugins\Zoho\Api;

class Engine
{
    /**
     * @var \Field
     */
    private $config;

    /**
     * @var \Field
     */
    private $field;

    /**
     * @var string
     */
    private $refreshToken;

    /**
     * @var array
     */
    private $records;

    /**
     * @var array
     */
    private $conversions;

    /**
     * Engine constructor.
     * @param array $Form
     * @param \Field $Post
     */
    public function __construct($Form, $Post)
    {
        $blogConfig = Config::loadDefaultField();
        $blogConfig->overload(Config::loadBlogConfig(BID));

        $this->config = $Form['data']->getChild('mail');
        $this->field = $Post->getChild('field');
        $this->refreshToken = $blogConfig->get('zoho_refresh_token');
        $this->records = array();
    }

    /**
     * Send
     */
    public function send()
    {
        new Api($this->refreshToken);
        $this->makeLabelConversionTable();
        $records = $this->makeRecords();
        $records = $this->addFieldsToRecords($records);
        $this->updateRecords($this->getRecordsByType($records, 'update'));
        $this->insertRecords($this->getRecordsByType($records, 'insert'));
        $this->updateRelatedRecords();
    }

    private function makeLabelConversionTable()
    {
        $zohoScopeGroup = $this->config->getArray('zoho_form_group_index');
        $scopes = array();
        foreach ($zohoScopeGroup as $i => $zohoScopeItem) {
            $zohoInsertScope = $this->config->get('zoho_form_insert_scope', '', $i);
            $zohoUpdateScope = $this->config->get('zoho_form_update_scope', '', $i);
            $insertScopes = explode(',', $zohoInsertScope);
            $updateScopes = explode(',', $zohoUpdateScope);
            $scopes = array_merge($scopes, $insertScopes, $updateScopes);
        }
        $scopes = array_unique($scopes);
        $scopes = array_filter($scopes);
        $ins = ZCRMRestClient::getInstance();
        try {
            $conversions = array();
            foreach ($scopes as $scope) {
                $module = $ins->getModule($scope)->getData();
                $moduleName = $module->getModuleName();
                $data = $module->getAllFields();
                $fields = $data->getData();
                $labels = array();
                foreach ($fields as $field) {
                    $label = $field->getFieldLabel();
                    $apiName = $field->getApiName();
                    $labels[$label] = $apiName;
                }
                $conversions[$moduleName] = $labels;
            }
            $this->conversions = $conversions;
            App::checkException();
        } catch (\Exception $e) {
            $this->warning(__FUNCTION__, $e);
        }
    }

    private function makeFieldNameByLabel($moduleName, $label)
    {
        if (isset($this->conversions[$moduleName][$label])) {
            return $this->conversions[$moduleName][$label];
        }
        return '';
    }

    /**
     * make scope list
     */
    private function makeRecords()
    {
        $zohoScopeGroup = $this->config->getArray('zoho_form_group_index');
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
                $uniqueKey = 'メール';
            }
            foreach ($insertScopes as $insertScope) {
                $records[] = array(
                    'scope' => $insertScope,
                    'uniqueKey' => array_search($insertScope, $updateScopes) !== false ? $uniqueKey : '',
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
        foreach ($keys as $key) {
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
                                $value = null;
                                if ($groupArr && in_array($key, $groupArr)) {
                                    $value = $field->get($key, '', $cnt);
                                } else {
                                    $value = implode("-", $field->getArray($key));
                                }
                                if ($value === 'true') {
                                    $value = true;
                                } else {
                                    if ($value === 'false') {
                                        $value = false;
                                    }
                                }
                                $item[$fieldKey] = $value;
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
        return array_filter($records, function ($record) use ($type) {
            return $record['type'] === $type;
        });
    }

    private function checkUniqueKeyExists($fields, $scope, $uniqueKey)
    {
        $newFields = array();
        foreach ($fields as $field) {
            if (!isset($field[$uniqueKey])) {
                $newFields[] = $field;
                continue;
            }
            $uniqueValue = $field[$uniqueKey];
            if ($uniqueValue) {
                try {
                    $zcrmModuleIns = ZCRMModule::getInstance($scope);
                    $key = $this->makeFieldNameByLabel($scope, $uniqueKey);
                    $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria("(" . $key . ":equals:" . $uniqueValue . ")");
                    $responses = $bulkAPIResponse->getData();
                    continue;
                } catch (\Exception $e) {
                    $this->warning(__FUNCTION__, $e);
                }
            }
            $newFields[] = $field;
        }
        return $newFields;
    }

    private function getFieldsWhereNotExistInContact($fields, $scope, $uniqueKey)
    {
        $newFields = array();
        foreach ($fields as $field) {
            if (isset($field[$uniqueKey])) {
                $uniqueValue = $field[$uniqueKey];
                if ($scope === 'Leads' && $uniqueValue) {
                    $zcrmModuleIns = ZCRMModule::getInstance("Leads");
                    $key = $this->makeFieldNameByLabel($scope, $uniqueKey);
                    if (!$key || !$uniqueValue) {
                        continue;
                    }
                    try {
                        $zcrmModuleIns = ZCRMModule::getInstance("Contacts");
                        $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria("(" . $key . ":equals:" . $uniqueValue . ")");
                        $responses = $bulkAPIResponse->getData();
                        if (count($responses)) {
                            continue;
                        }
                    } catch (\Exception $e) {
                        $this->warning(__FUNCTION__, $e);
                    }
                }
            }
            $newFields[] = $field;
        }
        return $newFields;
    }

    private function addNote($title, $content, $record)
    {
        $note = ZCRMNote::getInstance($record);
        $note->setTitle($title);
        $note->setContent($content);
        $record->addNote($note);
    }

    private function addIdsToRecords($records, $scope, $uniqueKey, $fields)
    {
        $newRecords = array();
        foreach ($records as $i => $record) {
            $key = $this->makeFieldNameByLabel($scope, $uniqueKey);
            $uniqueValue = isset($fields[$i][$uniqueKey]) ? $fields[$i][$uniqueKey] : false;
            if (!$key || !$uniqueValue) {
                continue;
            }
            try {
                $zcrmModuleIns = ZCRMModule::getInstance($scope);
                $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria("(" . $key . ":equals:" . $uniqueValue . ")");
                $responses = $bulkAPIResponse->getData();
                if (count($responses)) {
                    $entityId = $responses[0]->getEntityId();
                    $record->setEntityId($entityId);
                    $newRecords[] = $record;
                }
            } catch (\Exception $e) {
                $this->warning(__FUNCTION__, $e);
            }
        }
        return $newRecords;
    }

    private function getRecordLength($field)
    {
        $count = 0;
        foreach ($field as $label => $value) {
            $arr = explode(';', $value);
            if ($count < count($arr)) {
                $count = count($arr);
            }
        }
        return $count;
    }

    private function arrayCheck($fields)
    {
        $records = array();
        foreach ($fields as $j => $field) {
            $count = $this->getRecordLength($field);
            for ($i = 0; $i <= $count - 1; $i++) {
                $record = array_merge(array(), $fields[$j]);
                foreach ($field as $label => $value) {
                    if ($label) {
                        $items = explode(';', $value);
                        if (count($items) > 1) {
                            $record[$label] = $items[$i];

                        } else {
                            $record[$label] = $value;
                        }
                    }
                }
                $records[] = $record;
            }
        }
        return $records;
    }

    private function createRecords($scope, $fields)
    {
        $records = array();
        foreach ($fields as $field) {
            $record = ZCRMRecord::getInstance($scope, null);
            foreach ($field as $label => $value) {
                if ($label) {
                    $key = $this->makeFieldNameByLabel($scope, $label);
                    if (!$key) {
                        continue;
                    }
                    $record->setFieldValue($key, $value);
                }
            }
            $records[] = $record;
        }
        return $records;
    }

    private function insertRecords($records)
    {
        foreach ($records as $record) {
            $scope = $record['scope'];
            $uniqueKey = $record['uniqueKey'];
            $fields = $record['field'];
            $fields = $this->arrayCheck($fields);
            $fields = $this->getFieldsWhereNotExistInContact($fields, $scope, $uniqueKey);
            $fields = $this->checkUniqueKeyExists($fields, $scope, $uniqueKey);
            if (empty($fields)) {
                continue;
            }
            try {
                $client = ZCRMModule::getInstance($scope);
                $data = $this->createRecords($scope, $fields);
                $bulkAPIResponse = $client->createRecords($data);
                $responses = $bulkAPIResponse->getEntityResponses();
                foreach ($responses as $i => $response) {
                    $updated = $response->getData();
                    if (isset($fields[$i]['Note Title']) && isset($fields[$i]['Note Content']) && $updated) {
                        $this->addNote($fields[$i]['Note Title'], $fields[$i]['Note Content'], $updated);
                    }
                    $this->records[] = array(
                        'record' => $updated,
                        'field' => $fields[$i],
                        'scope' => $scope
                    );
                }
            } catch (\Exception $e) {
                $this->warning(__FUNCTION__, $e);
            }
        }
    }

    private function updateRecords($records)
    {
        foreach ($records as $record) {
            $scope = $record['scope'];
            $uniqueKey = $record['uniqueKey'];
            $fields = $record['field'];
            if (empty($fields)) {
                continue;
            }
            try {
                $client = ZCRMModule::getInstance($scope);
                $data = $this->createRecords($scope, $fields);
                $data = $this->addIdsToRecords($data, $scope, $uniqueKey, $fields);
                $bulkAPIResponse = $client->updateRecords($data);
                $responses = $bulkAPIResponse->getEntityResponses();
                foreach ($responses as $i => $response) {
                    $updated = $response->getData();
                    if (isset($fields[$i]['Note Title']) && isset($fields[$i]['Note Content'])) {
                        $this->addNote($fields[$i]['Note Title'], $fields[$i]['Note Content'], $updated);
                    }
                    $this->records[] = array(
                        'record' => $updated,
                        'field' => $fields[$i],
                        'scope' => $scope
                    );
                }
            } catch (\Exception $e) {
                $this->warning(__FUNCTION__, $e);
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

            $targets = array_filter($records, function ($item) use ($zohoRelatedTargetScope) {
                return $item['scope'] === $zohoRelatedTargetScope;
            });

            $items = array_filter($records, function ($item) use ($zohoRelatedScope) {
                return $item['scope'] === $zohoRelatedScope;
            });


            if (!count($targets) || !count($items)) {
                continue;
            }

            foreach ($targets as $target) {
                foreach ($items as $item) {
                    if (!isset($item['field'][$compareField]) || !isset($target['field'][$compareField])) {
                        continue;
                    }
                    if ($item['field'][$compareField] !== $target['field'][$compareField]) {
                        continue;
                    }
                    $parentRecord = $item['record'];
                    $lookupRecord = $target['record'];
                    if ($lookupId) {
                        $key = $this->makeFieldNameByLabel($zohoRelatedScope, $lookupId);
                        if (!$key) {
                            continue;
                        }
                        if ($parentRecord) {
                            $parentRecord->setFieldValue($key, $lookupRecord);
                            try {
                                $parentRecord->update();
                            } catch (\Exception $e) {
                                $this->warning(__FUNCTION__, $e);
                            }
                        }
                    } else {
                        $junctionRecord = ZCRMJunctionRecord::getInstance($zohoRelatedTargetScope,
                        $lookupRecord->getEntityId());
                        $parentRecord->addRelation($junctionRecord);
                    }
                }
            }
        }
    }

    /**
     * 警告ログの出力
     *
     * @param string $methodName
     * @param Exception $e
     */
    private function warning(string $methodName, \Exception $e)
    {
        $log = 'ACMS Warning: Zoho plugin, ' . $methodName . ': ' . $e->getMessage();
        if (class_exists('AcmsLogger')) {
            \AcmsLogger::warning($log, Common::exceptionArray($e));
        } else {
            userErrorLog($log);
        }
    }
}
