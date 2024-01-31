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
        $recordArray = $this->createRecordArray($this->field);
        $updateRecordArray = $this->getRecordsByType($recordArray, 'update');
        $insertRecordArray = $this->getRecordsByType($recordArray, 'insert');
        $updated = $this->updateRecords($updateRecordArray);
        $inserted = $this->insertRecords($insertRecordArray);
        $this->updateRelatedRecords(array_merge($updated, $inserted));
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
                    'map' => array_map(
                        function (\ZCRMField $field) {
                            return [$field->getFieldLabel() => $field->getApiName()];
                        },
                        $this->getFieldsByModule($module)
                    ),
                ];
            },
            $modules
        );
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
     * zohoに送信するレコードオブジェクトの元となる配列を作成する
     *
     * @param \Field $field
     * @return array{
     *  moduleName: string,
     *  uniqueKey: string,
     *  field: array<string, string>,
     *  type: string
     * }
     */
    private function createRecords(\Field $field)
    {
        $moduleGroup = $this->config->getArray('zoho_form_group_index');
        $records = [];
        foreach (array_keys($moduleGroup) as $i) {
            $insertModuleNames = array_map('trim', explode(',', $this->config->get('zoho_form_insert_scope', '', $i)));
            $updateModuleNames = array_map('trim', explode(',', $this->config->get('zoho_form_update_scope', '', $i)));
            $uniqueKey = $this->config->get('zoho_form_unique_key', 'メール', $i);

            foreach ($insertModuleNames as $moduleName) {
                $records[] = $this->createInsertRecords(
                    $moduleName,
                    array_search($moduleName, $updateModuleNames) !== false ? $uniqueKey : '',
                    $this->createFields($field, $moduleName, 'insert')
                );
                $records[] = [
                    'moduleName' => $moduleName,
                    'uniqueKey' => array_search($moduleName, $updateModuleNames) !== false ? $uniqueKey : '',
                    'fields' => $this->createFields($field, $moduleName, 'insert'),
                    'type' => 'insert'
                ];
            }
            foreach ($updateModuleNames as $moduleName) {
                $records[] = [
                    'moduleName' => $moduleName,
                    'uniqueKey' => $uniqueKey,
                    'fields' => $this->createFields($field, $moduleName, 'update'),
                    'type' => 'update'
                ];
            }
        }
        return $records;
    }

    /**
     * 追加処理用のZCRMRecordオブジェクトの配列を作成する
     *
     * @param string $moduleName
     * @param string $uniqueKey
     * @param array<{ key: string, value: string }> $fields
     * @return \ZCRMRecord[]
     */
    private function createInsertRecords($moduleName, $uniqueKey, $fields)
    {
        return array_map(
            function (array $field) use ($moduleName, $uniqueKey) {
                $record = ZCRMRecord::getInstance($moduleName, null);
                foreach ($field as $labelName => $value) {
                    if (empty($labelName)) {
                        continue;
                    }
                    $apiName = $this->getApiNameByLabelName($labelName, $moduleName);
                    if (empty($apiName)) {
                        continue;
                    }
                    $record->setFieldValue($apiName, $value);
                }
                return [
                    'record' => $record,
                    'field' => $field,
                    'moduleName' => $moduleName,
                    'uniqueKey' => $uniqueKey
                ];
            },
            $fields
        );
        )
        foreach ($fields as $field) {
            $record = ZCRMRecord::getInstance($moduleName, null);
            foreach ($field as $labelName => $value) {
                if (empty($labelName)) {
                    continue;
                }
                $apiName = $this->getApiNameByLabelName($labelName, $moduleName);
                if (empty($apiName)) {
                    continue;
                }
                $record->setFieldValue($apiName, $value);
            }
            $records[] = $record;
        }
        return $records;
    }

    /**
     * カスタムフィールドグループのグループ数を取得する
     *
     * @param string[] $keys
     * @param \Field $field
     * @return int
     */
    private function getFieldGroupLength(array $keys, \Field $field)
    {
        $length = 1;
        foreach ($keys as $key) {
            $arr = $field->getArray($key);
            $cnt = count($arr);
            if ($cnt > $length) {
                $length = $cnt;
            }
        }
        return $length;
    }

    /**
     * カスタムフィールドグループの値を取得する
     *
     * @param \Field $field
     * @param string $moduleName
     * @param string $type
     * @return string[]
     */
    private function getFieldGroupKeys(\Field $field, string $moduleName, string $type): array
    {
        $keys = $this->config->getArray('zoho_field_cms_key');
        foreach ($keys as $i => $key) {
            $isInsert = $this->config->get('zoho_field_insert', '', $i) === 'true';
            $isUpdate = $this->config->get('zoho_field_update', '', $i) === 'true';
            if ($type === 'insert' && $isInsert === false) {
                continue;
            }
            if ($type === 'update' && $isUpdate === false) {
                continue;
            }
            $fieldModuleNames = array_map('trim', explode(',', $this->config->get('zoho_field_scope', '', $i)));
            foreach ($fieldModuleNames as $fieldModuleName) {
                if ($fieldModuleName === $moduleName) {
                    if (isset($key) && isset($key[0]) && $key[0] === '@') {
                        return $field->getArray($key);
                    }
                }
            }
        }
        return [];
    }

    /**
     * フィールドオブジェクトからzohoに送信するフィールドの配列を作成する
     *
     * @param \Field $_field
     * @param string $moduleName
     * @param string $type
     * @return array<string, string>
     */
    private function createFields(\Field $_field, string $moduleName, string $type)
    {
        $zohoKeys = $this->config->getArray('zoho_field_key');

        $field = [];
        $length = 1;
        $fieldGroupKeys = $this->getFieldGroupKeys($_field, $moduleName, $type);
        if (!empty($fieldGroupKeys)) {
            $length = $this->getFieldGroupLength($fieldGroupKeys, $_field);
        }

        for ($cnt = 0; $cnt < $length; $cnt++) {
            $fieldItems = [];
            foreach ($zohoKeys as $i => $zohoKey) {
                $acmskey = $this->config->get('zoho_field_cms_key', '', $i);
                $fieldModuleNames = array_map('trim', explode(',', $this->config->get('zoho_field_scope', '', $i)));
                $isInsert = $this->config->get('zoho_field_insert', '', $i) === 'true';
                $isUpdate = $this->config->get('zoho_field_update', '', $i) === 'true';
                foreach ($fieldModuleNames as $fieldModuleName) {
                    if ($fieldModuleName !== $moduleName) {
                        // フォームの権限設定で設定されたモジュール名以外はスキップ
                        continue;
                    }
                    if ($type === 'insert' && $isInsert === false) {
                        // フィールドの追加が許可されていない場合はスキップ
                        continue;
                    }

                    if ($type === 'update' && $isUpdate === false) {
                        // フィールドの更新が許可されていない場合はスキップ
                        continue;
                    }
                    $value = null;
                    if (!empty($fieldGroupKeys) && in_array($acmskey, $fieldGroupKeys)) {
                        $value = $_field->get($acmskey, '', $cnt);
                    } else {
                        $value = implode("-", $_field->getArray($acmskey));
                    }
                    if ($value === 'true') {
                        $value = true;
                    }
                    if ($value === 'false') {
                        $value = false;
                    }
                    $fieldItems[] = [
                        'key' => $zohoKey,
                        'value' => $value
                    ];
                }
            }
            $field[] = $fieldItems;
        }
        return $fields;
    }

    private function getRecordsByType($records, $type)
    {
        return array_filter(
            $records,
            function ($record) use ($type) {
                return $record['type'] === $type;
            }
        );
    }

    private function checkUniqueKeyExists($fields, $moduleName, $uniqueKey)
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
                    $zcrmModuleIns = ZCRMModule::getInstance($moduleName);
                    $apiName = $this->getApiNameByLabelName($uniqueKey, $moduleName);
                    $zcrmModuleIns->searchRecordsByCriteria("(" . $apiName . ":equals:" . $uniqueValue . ")");

                    // エラーにならなかった場合は既に存在するレコードなのでスキップ
                    continue;
                } catch (\ZCRMException $e) {
                    if ($e->getExceptionCode() === 'No Content') {
                        // エラーコードがNo Contentの場合はレコードが存在しないので処理を続行
                        $newFields[] = $field;
                    } else {
                        // それ以外のエラーの場合は例外をスロー
                        throw $e;
                    }
                }
            }
        }
        return $newFields;
    }

    private function getFieldsWhereNotExistInContact($fields, $moduleName, $uniqueKey)
    {
        $newFields = array();
        foreach ($fields as $field) {
            if (isset($field[$uniqueKey])) {
                $uniqueValue = $field[$uniqueKey];
                if ($moduleName === 'Leads' && $uniqueValue) {
                    $zcrmModuleIns = ZCRMModule::getInstance("Leads");
                    $apiName = $this->getApiNameByLabelName($uniqueKey, $moduleName);
                    if (!$apiName || !$uniqueValue) {
                        continue;
                    }
                    try {
                        $zcrmModuleIns = ZCRMModule::getInstance("Contacts");
                        $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria("(" . $apiName . ":equals:" . $uniqueValue . ")");
                        $responses = $bulkAPIResponse->getData();
                        if (count($responses)) {
                            // 既にContactsに存在する場合はスキップ
                            continue;
                        }
                    } catch (\ZCRMException $e) {
                        if ($e->getExceptionCode() === 'No Content') {
                            // エラーコードがNo Contentの場合はレコードが存在しないので処理を続行
                            $newFields[] = $field;
                        } else {
                            // それ以外のエラーの場合は例外をスロー
                            throw $e;
                        }
                    }
                }
            }
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

    private function addIdsToRecords($records, $moduleName, $uniqueKey, $fields)
    {
        $newRecords = array();
        foreach ($records as $i => $record) {
            $apiName = $this->getApiNameByLabelName($uniqueKey, $moduleName);
            $uniqueValue = isset($fields[$i][$uniqueKey]) ? $fields[$i][$uniqueKey] : false;
            if (!$apiName || !$uniqueValue) {
                continue;
            }
            try {
                $zcrmModuleIns = ZCRMModule::getInstance($moduleName);
                $criteria = "(" . $apiName . ":equals:" . $uniqueValue . ")";
                $bulkAPIResponse = $zcrmModuleIns->searchRecordsByCriteria($criteria);
                $responses = $bulkAPIResponse->getData();
                if (count($responses)) {
                    $entityId = $responses[0]->getEntityId();
                    $record->setEntityId($entityId);
                    $newRecords[] = $record;
                }
            } catch (\ZCRMException $e) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::warning(
                        '【Zoho plugin】 レコードの検索でエラーが発生したため、',
                        Common::exceptionArray($e, [
                            'code' => $e->getExceptionCode(),
                            'details' => $e->getExceptionDetails(),
                            'moduleName' => $moduleName,
                            'criteria' => $criteria,
                        ])
                    );
                } else {
                    userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
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

    /**
     * create records
     * @param string $moduleName
     * @param array $fields
     * @return \ZCRMRecord[]
     */
    private function createRecords($moduleName, $fields)
    {
        $records = [];
        foreach ($fields as $field) {
            $record = ZCRMRecord::getInstance($moduleName, null);
            foreach ($field as $labelName => $value) {
                if (empty($labelName)) {
                    continue;
                }
                $apiName = $this->getApiNameByLabelName($labelName, $moduleName);
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
        $insertedRecords = [];
        foreach ($records as $record) {
            $moduleName = $record['moduleName'];
            $uniqueKey = $record['uniqueKey'];
            $fields = $record['field'];
            $fields = $this->arrayCheck($fields);
            $fields = $this->getFieldsWhereNotExistInContact($fields, $moduleName, $uniqueKey);
            $fields = $this->checkUniqueKeyExists($fields, $moduleName, $uniqueKey);
            if (empty($fields)) {
                continue;
            }
            try {
                $client = ZCRMModule::getInstance($moduleName);
                $data = $this->createRecords($moduleName, $fields);
                $bulkAPIResponse = $client->createRecords($data);
                $responses = $bulkAPIResponse->getEntityResponses();
                foreach ($responses as $i => $response) {
                    $updated = $response->getData();
                    if (isset($fields[$i]['Note Title']) && isset($fields[$i]['Note Content']) && $updated) {
                        $this->addNote($fields[$i]['Note Title'], $fields[$i]['Note Content'], $updated);
                    }
                    $insertedRecords[] = array(
                        'record' => $updated,
                        'field' => $fields[$i],
                        'moduleName' => $moduleName
                    );
                }
            } catch (\ZCRMEXCEption $e) {
                $this->warning(__FUNCTION__, $e);
            }
        }

        return $insertedRecords;
    }

    private function updateRecords($records)
    {
        $updatedRecords = [];
        foreach ($records as $record) {
            $moduleName = $record['moduleName'];
            $uniqueKey = $record['uniqueKey'];
            $fields = $record['field'];
            if (empty($fields)) {
                continue;
            }
            try {
                $client = ZCRMModule::getInstance($moduleName);
                $data = $this->createRecords($moduleName, $fields);
                $data = $this->addIdsToRecords($data, $moduleName, $uniqueKey, $fields);
                $bulkAPIResponse = $client->updateRecords($data);
                $responses = $bulkAPIResponse->getEntityResponses();
                foreach ($responses as $i => $response) {
                    $updated = $response->getData();
                    if (isset($fields[$i]['Note Title']) && isset($fields[$i]['Note Content'])) {
                        $this->addNote($fields[$i]['Note Title'], $fields[$i]['Note Content'], $updated);
                    }
                    $updatedRecords[] = array(
                        'record' => $updated,
                        'field' => $fields[$i],
                        'moduleName' => $moduleName
                    );
                }
            } catch (\ZCRMEXCEption $e) {
                $this->warning(__FUNCTION__, $e);
            }
        }
        return $updatedRecords;
    }

    private function updateRelatedRecords(array $records)
    {
        $relatedModuleNames = $this->config->getArray('zoho_related_scope');
        foreach ($relatedModuleNames as $i => $relatedModuleName) {
            $relatedTargetModuleName = $this->config->get('zoho_related_target_scope', '', $i);
            $lookupId = $this->config->get('zoho_related_lookup_id', '', $i);
            $compareField = $this->config->get('zoho_related_compare_field', '', $i);

            $targets = array_filter(
                $records,
                function ($record) use ($relatedTargetModuleName) {
                    return $record['moduleName'] === $relatedTargetModuleName;
                }
            );

            $items = array_filter(
                $records,
                function ($record) use ($relatedModuleName) {
                    return $record['moduleName'] === $relatedModuleName;
                }
            );


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
                        $apiName = $this->getApiNameByLabelName($lookupId, $relatedModuleName);
                        if (!$apiName) {
                            continue;
                        }
                        if ($parentRecord) {
                            $parentRecord->setFieldValue($apiName, $lookupRecord);
                            try {
                                $parentRecord->update();
                            } catch (\ZCRMEXCEption $e) {
                                $this->warning(__FUNCTION__, $e);
                            }
                        }
                    } else {
                        $junctionRecord = ZCRMJunctionRecord::getInstance(
                            $relatedTargetModuleName,
                            $lookupRecord->getEntityId()
                        );
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
     * @param \ZCRMException $e
     */
    private function warning(string $methodName, \ZCRMException $e)
    {
        if (class_exists('AcmsLogger')) {
            AcmsLogger::warning(
                '【Zoho plugin】 ' . $methodName . ': ' . $e->getMessage(),
                Common::exceptionArray($e, [
                    'code' => $e->getExceptionCode(),
                    'details' => $e->getExceptionDetails()
                ])
            );
        } else {
            userErrorLog('ACMS Warning: Zoho plugin, ' . $methodName . ': ' . $e->getMessage());
        }
    }
}
