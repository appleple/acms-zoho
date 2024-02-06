<?php

namespace Acms\Plugins\Zoho;

use Field;
use App;
use Common;
use AcmsLogger;

use ZCRMModule;
use ZCRMRecord;
use ZCRMRestClient;
use ZCRMNote;
use ZCRMJunctionRecord;

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
     * @var array
     */
    private $records;

    /**
     * ラベル名からAPI名への変換用マップデータ
     *
     * @var array{ moduleName: string, map: array<string, string>}
     */
    private $labelNameToApiNameMap;

    /**
     * @var Api
     */
    private $oauthClient;

    /**
     * Engine constructor.
     * @param array $Form
     * @param \Field $Post
     */
    public function __construct($Form, $Post)
    {
        $this->config = $Form['data']->getChild('mail');
        $this->field = $Post->getChild('field');
        $this->records = array();
        $this->oauthClient = App::make('zoho.api');
    }

    /**
     * Send
     */
    public function send()
    {
        if (is_null($this->oauthClient->getAccessToken())) {
            return;
        }
        $moduleNames = $this->getIntegrationModuleNames();
        $modules = array_map(
            function (string $moduleName) {
                return $this->getModuleByName($moduleName);
            },
            $moduleNames
        );
        $this->labelNameToApiNameMap = $this->getLabelNameToApiNameMap($modules);
        $records = $this->makeRecords();
        $records = $this->addFieldsToRecords($records);
        $this->updateRecords($this->getRecordsByType($records, 'update'));
        $this->insertRecords($this->getRecordsByType($records, 'insert'));
        $this->updateRelatedRecords();
    }

    /**
     * フォーム設定から連携するモジュール名を配列で取得する
     *
     * @return string[]
     */
    private function getIntegrationModuleNames(): array
    {
        $moduleGroup = $this->config->getArray('zoho_form_group_index');
        $moduleNames = [];
        foreach (array_keys($moduleGroup) as $i) {
            $insertModules = array_map('trim', explode(',', $this->config->get('zoho_form_insert_scope', '', $i)));
            $updateModules = array_map('trim', explode(',', $this->config->get('zoho_form_update_scope', '', $i)));
            $moduleNames = array_merge($moduleNames, $insertModules, $updateModules);
        }
        $moduleNames = array_unique($moduleNames);
        $moduleNames = array_filter($moduleNames);
        return $moduleNames;
    }

    /**
     * ラベル名からAPI名への変換用マップデータを取得する
     *
     * @param \ZCRMModule[] $module
     * @return array{ moduleName: string, map: array<string, string>}
     */
    private function getLabelNameToApiNameMap(array $modules = [])
    {
        return array_map(
            function (\ZCRMModule $module) {
                return [
                    'moduleName' => $module->getModuleName(),
                    'map' => array_reduce(
                        $this->getFieldsByModule($module),
                        function (array $map, \ZCRMField $field) {
                            return $map + [$field->getFieldLabel() => $field->getApiName()];
                        },
                        []
                    ),
                ];
            },
            $modules
        );
    }

    /**
     * ラベル名からAPI名を取得する
     *
     * @param string $labelName
     * @param string $moduleName
     * @return string
     */
    private function getApiNameByLabelName($labelName, $moduleName)
    {
        foreach ($this->labelNameToApiNameMap as $dataset) {
            if ($dataset['moduleName'] === $moduleName) {
                $map = $dataset['map'];
                if (isset($map[$labelName])) {
                    return $map[$labelName];
                }
            }
        }

        return '';
    }

    /**
     * モジュール名からモジュールを取得する
     *
     * @param string $moduleName
     * @return \ZCRMModule|null
     * @throws \ZCRMException
     */
    private function getModuleByName(string $moduleName): ?\ZCRMModule
    {
        $ins = ZCRMRestClient::getInstance();
        $module = null;
        try {
            $module = $ins->getModule($moduleName)->getData();
        } catch (\ZCRMException $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ' . $moduleName . 'モジュールの取得に失敗しました。モジュール名が正しいか確認してください。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
        }
        return $module;
    }

    /**
     * モジュールからフィールドを取得する
     *
     * @param \ZCRMModule $module
     * @return \ZCRMField[]
     */
    private function getFieldsByModule(\ZCRMModule $module): array
    {
        $fields = [];
        try {
            /** @var \ApiResponse $response */
            $response = $module->getAllFields();
            /** @var \ZCRMField[] $fields */
            $fields = $response->getData();
        } catch (\ZCRMException $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ' . $module->getModuleName() . 'のフィールドの取得に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
        }
        return $fields;
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
                    $apiName = $this->getApiNameByLabelName($uniqueKey, $scope);
                    $zcrmModuleIns->searchRecordsByCriteria("(" . $apiName . ":equals:" . $uniqueValue . ")");
                    // エラーにならなかった場合は既に存在するレコードなのでスキップ
                    continue;
                } catch (\ZCRMEXCEption $e) {
                    if ($e->getExceptionCode() !== 'NO CONTENT') {
                        // エラーコードがNO CONTENTの場合はレコードが存在しないので処理を続行
                        // それ以外のエラーの場合は例外をスロー
                        throw $e;
                    }
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
                    $apiName = $this->getApiNameByLabelName($uniqueKey, $scope);
                    if (empty($apiName) || empty($uniqueValue)) {
                        continue;
                    }
                    try {
                        $zcrmModuleIns = ZCRMModule::getInstance("Contacts");
                        $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria("(" . $apiName . ":equals:" . $uniqueValue . ")");
                        $records = $bulkAPIResponse->getData();
                        if (count($records) > 0) {
                            // 既にContactsに存在する項目はスキップ
                            continue;
                        }
                    } catch (\ZCRMEXCEption $e) {
                        if ($e->getExceptionCode() !== 'NO CONTENT') {
                            // エラーコードがNO CONTENTの場合はレコードが存在しないので処理を続行
                            // それ以外のエラーの場合は例外をスロー
                            throw $e;
                        }
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
            $apiName = $this->getApiNameByLabelName($uniqueKey, $scope);
            $uniqueValue = isset($fields[$i][$uniqueKey]) ? $fields[$i][$uniqueKey] : false;
            if (empty($apiName) || empty($uniqueValue)) {
                continue;
            }
            try {
                $zcrmModuleIns = ZCRMModule::getInstance($scope);
                $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria("(" . $apiName . ":equals:" . $uniqueValue . ")");
                $records = $bulkAPIResponse->getData();
                if (count($records) > 0) {
                    $entityId = $records[0]->getEntityId();
                    $record->setEntityId($entityId);
                    $newRecords[] = $record;
                }
            } catch (\ZCRMEXCEption $e) {
                if ($e->getExceptionCode() !== 'NO CONTENT') {
                    // エラーコードがNO CONTENTの場合はレコードが存在しないので処理を続行
                    // それ以外のエラーの場合は例外をスロー
                    throw $e;
                }
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
            foreach ($field as $labelName => $value) {
                if (empty($labelName)) {
                    continue;
                }
                $apiName = $this->getApiNameByLabelName($labelName, $scope);
                if (empty($apiName)) {
                    continue;
                }
                $record->setFieldValue($apiName, $value);
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

            $module = ZCRMModule::getInstance($scope);
            $zohoRecords = $this->createRecords($scope, $fields);

            if (empty($zohoRecords)) {
                continue;
            }

            if (class_exists('AcmsLogger')) {
                AcmsLogger::info(
                    '【Zoho plugin】 ' . $module->getAPIName() . 'タブのレコード作成を行います。' ,
                    ['records' => array_map([$this, 'recordToArray'], $zohoRecords)]
                );
            }

            try {
                /** @var \BulkAPIResponse $bulkAPIResponse */
                $bulkAPIResponse = $module->createRecords($zohoRecords);

                /** @var \EntityResponse[] $responses */
                $responses = $bulkAPIResponse->getEntityResponses();
                $createdRecords = [];
                foreach ($responses as $i => $response) {
                    /** @var \ZCRMRecord|null $createdRecord */
                    $createdRecord = $response->getData();
                    if (is_null($createdRecord)) {
                        if (class_exists('AcmsLogger')) {
                            $failedRecords = $zohoRecords[$i];
                            AcmsLogger::error(
                                '【Zoho plugin】 ' . $failedRecords->getModuleApiName() . 'タブのレコード作成に失敗しました。' ,
                                $this->entityResponseToArray($response, [
                                    'record' => $this->recordToArray($failedRecords)
                                ])
                            );
                        }
                        return;
                    }
                    if (isset($fields[$i]['Note Title']) && isset($fields[$i]['Note Content']) && $createdRecord) {
                        $this->addNote($fields[$i]['Note Title'], $fields[$i]['Note Content'], $createdRecord);
                    }
                    $createdRecords[] = $createdRecord;
                    $this->records[] = array(
                        'record' => $createdRecord,
                        'field' => $fields[$i],
                        'scope' => $scope
                    );
                }
                if (empty($createdRecords) !== true) {
                    if (class_exists('AcmsLogger')) {
                        AcmsLogger::info(
                            '【Zoho plugin】 ' . $module->getAPIName() . 'タブのレコード作成に成功しました。' ,
                            ['records' => array_map([$this, 'recordToArray'], $createdRecords)]
                        );
                    }
                }
            } catch (\ZCRMEXCEption $e) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::error(
                        '【Zoho plugin】 ' . $module->getAPIName() . 'タブのレコード作成に失敗しました。' ,
                        Common::exceptionArray($e, [
                            'code' => $e->getExceptionCode(),
                            'details' => $e->getExceptionDetails(),
                            'records' => array_map([$this, 'recordToArray'], $zohoRecords)
                        ]),
                    );
                } else {
                    userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
                }
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
            $module = ZCRMModule::getInstance($scope);
            $zohoRecords = $this->createRecords($scope, $fields);
            $zohoRecords = $this->addIdsToRecords($zohoRecords, $scope, $uniqueKey, $fields);

            if (empty($zohoRecords)) {
                continue;
            }

            if (class_exists('AcmsLogger')) {
                AcmsLogger::info(
                    '【Zoho plugin】 ' . $module->getAPIName() . 'タブのレコード更新を行います。' ,
                    ['records' => array_map([$this, 'recordToArray'], $zohoRecords)]
                );
            }

            try {
                /** @var \BulkAPIResponse $bulkAPIResponse */
                $bulkAPIResponse = $module->updateRecords($zohoRecords);
                /** @var \EntityResponse[] $responses */
                $responses = $bulkAPIResponse->getEntityResponses();

                $updatedRecords = [];
                foreach ($responses as $i => $response) {
                    /** @var \ZCRMRecord|null $updatedRecord */
                    $updatedRecord = $response->getData();
                    if (is_null($updatedRecord)) {
                        if (class_exists('AcmsLogger')) {
                            $failedRecords = $zohoRecords[$i];
                            AcmsLogger::error(
                                '【Zoho plugin】 ' . $failedRecords->getModuleApiName() . 'タブのレコード更新に失敗しました。' ,
                                $this->entityResponseToArray($response, [
                                    'record' => $this->recordToArray($failedRecords)
                                ])
                            );
                        }
                        return;
                    }
                    if (isset($fields[$i]['Note Title']) && isset($fields[$i]['Note Content'])) {
                        $this->addNote($fields[$i]['Note Title'], $fields[$i]['Note Content'], $updatedRecord);
                    }

                    $updatedRecords[] = $updatedRecord;
                    $this->records[] = array(
                        'record' => $updatedRecord,
                        'field' => $fields[$i],
                        'scope' => $scope
                    );
                }

                if (empty($updatedRecords) !== true) {
                    if (class_exists('AcmsLogger')) {
                        AcmsLogger::info(
                            '【Zoho plugin】 ' . $module->getAPIName() . 'タブのレコード更新に成功しました。' ,
                            ['records' => array_map([$this, 'recordToArray'], $zohoRecords)]
                        );
                    }
                }
            } catch (\ZCRMEXCEption $e) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::error(
                        '【Zoho plugin】 ' . $module->getAPIName() . 'タブのレコード更新に失敗しました。' ,
                        Common::exceptionArray($e, [
                            'code' => $e->getExceptionCode(),
                            'details' => $e->getExceptionDetails(),
                            'records' => array_map([$this, 'recordToArray'], $zohoRecords)
                        ]),
                    );
                } else {
                    userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
                }
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
                    /** @var \ZCRMRecord $parentRecord */
                    $parentRecord = $item['record'];
                    /** @var \ZCRMRecord $lookupRecord */
                    $lookupRecord = $target['record'];
                    if ($lookupId) {
                        $apiName = $this->getApiNameByLabelName($lookupId, $zohoRelatedScope);
                        if (empty($apiName)) {
                            continue;
                        }
                        if ($parentRecord) {
                            $parentRecord->setFieldValue($apiName, $lookupRecord);
                            try {
                                $response = $parentRecord->update();
                                $updatedRecord = $response->getData();
                                if (class_exists('AcmsLogger')) {
                                    AcmsLogger::info(
                                        '【Zoho plugin】 ルックアップ項目「' . $lookupId . '(' . $apiName . ')' . '」の更新に成功しました。' ,
                                        [
                                            'updatedRecord' => $this->recordToArray($updatedRecord),
                                        ]
                                    );
                                }
                            } catch (\ZCRMEXCEption $e) {
                                if (class_exists('AcmsLogger')) {
                                    AcmsLogger::error(
                                        '【Zoho plugin】 ルックアップ項目「' . $lookupId . '(' . $apiName . ')' . '」の更新に失敗しました。' ,
                                        Common::exceptionArray($e, [
                                            'code' => $e->getExceptionCode(),
                                            'details' => $e->getExceptionDetails(),
                                            'parentRecord' => $this->recordToArray($parentRecord),
                                            'lookupRecord' => $this->recordToArray($lookupRecord)
                                        ]),
                                    );
                                } else {
                                    userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
                                }
                            }
                        }
                    } else {
                        $junctionRecord = ZCRMJunctionRecord::getInstance($zohoRelatedTargetScope, $lookupRecord->getEntityId());
                        $parentRecord->addRelation($junctionRecord);
                    }
                }
            }
        }
    }

    /**
     * ログ出力用にZCRMRecordオブジェクトをフォーマットする
     *
     * @param \ZCRMRecord $record
     * @return array
     */
    private function recordToArray(\ZCRMRecord $record): array
    {
        return [
            'id' => $record->getEntityId(),
            'module' => $record->getModuleApiName(),
            'fields' => $record->getData()
        ];
    }

    /**
     * ログ出力用にEntityResponseオブジェクトをフォーマットする
     *
     * @param \EntityResponse $entityResponse
     * @param array $info
     * @return array
     */
    private function entityResponseToArray(\EntityResponse $entityResponse, array $info = []): array
    {
        return array_merge(
            [
                'status' => $entityResponse->getStatus(),
                'message' => $entityResponse->getMessage(),
                'code' => $entityResponse->getCode(),
                'details' => $entityResponse->getDetails()
            ],
            $info,
        );
    }
}
