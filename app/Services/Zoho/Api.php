<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
use Acms\Plugins\Zoho\Services\Zoho\Client;
use AcmsLogger;
use Common;

use com\zoho\crm\api\HeaderMap;
use com\zoho\crm\api\ParameterMap;

// record
use com\zoho\crm\api\record\RecordOperations;
use com\zoho\crm\api\record\GetRecordsParam;
use com\zoho\crm\api\record\SearchRecordsParam;
// use com\zoho\crm\api\record\GetRecordsHeader;
use com\zoho\crm\api\record\ActionWrapper;
use com\zoho\crm\api\record\APIException;
use com\zoho\crm\api\record\BodyWrapper;
use com\zoho\crm\api\record\Record as ZohoRecord;
use com\zoho\crm\api\record\SuccessResponse;
// use com\zoho\crm\api\record\Leads;

// module
use com\zoho\crm\api\modules\ModulesOperations;
use com\zoho\crm\api\modules\ResponseWrapper;
use com\zoho\crm\api\modules\Modules as ZohoModules;

// fields
use com\zoho\crm\api\fields\ResponseWrapper as FieldsResponseWrapper;
use com\zoho\crm\api\fields\FieldsOperations;

// use com\zoho\crm\api\tags\Tag;
use com\zoho\crm\api\util\Choice;
use com\zoho\crm\api\exception\SDKException;
// use \com\zoho\crm\api\notes\NotesOperations;

/**
 * Zoho CRM APIとの通信を行うクラス
 */
class Api
{
    /** @var Client */
    private $client;

    /** @var array ラベル名からAPI名への変換用マップデータ */
    private $labelNameToApiNameMap = [];

    /** @var array 処理済みレコードのリスト */
    private $processedRecords = [];

    /**
     * コンストラクタ
     *
     * @param Client $client Zoho APIクライアント
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * ラベル名からAPI名へのマッピング情報を設定
     *
     * @param array $map マッピング情報
     * @return self
     */
    public function setLabelToApiNameMap(array $map)
    {
        $this->labelNameToApiNameMap = $map;
        return $this;
    }

    /**
     * 処理済みレコードを取得
     *
     * @return array
     */
    public function getProcessedRecords()
    {
        return $this->processedRecords;
    }

    /**
     * レコードを取得する
     *
     * @param string $moduleAPIName タブのAPI名
     * @param array $fields 取得するフィールド名の配列
     * @return array 取得したレコードデータ
     */
    public function getRecords(string $moduleAPIName, array $fields = ["id", "Email"])
    {
        try {
            $recordOperations = new RecordOperations($moduleAPIName);
            $paramInstance = new ParameterMap();

            foreach ($fields as $fieldName) {
                $paramInstance->add(GetRecordsParam::fields(), $fieldName);
            }

            $headerInstance = new HeaderMap();
            $response = $recordOperations->getRecords($paramInstance, $headerInstance);

            if ($response->isExpected()) {
                return $response->getObject()->getData();
            }

            return [];
        } catch (SDKException $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ' . $moduleAPIName . 'のレコード取得に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
            return [];
        }
    }

    /**
     * レコードを検索する
     *
     * @param string $moduleAPIName モジュール名
     * @param string $criteria 検索条件
     * @return array|null 検索結果
     */
    public function searchRecords(string $moduleAPIName, string $criteria)
    {
        try {
            $recordOperations = new RecordOperations($moduleAPIName);
            $paramInstance = new ParameterMap();
            $paramInstance->add(SearchRecordsParam::criteria(), $criteria);

            $response = $recordOperations->searchRecords($paramInstance, new HeaderMap());

            if ($response->isExpected()) {
                return $response->getObject()->getData();
            }

            return null;
        } catch (SDKException $e) {
            // NO CONTENT (レコードが見つからない)の場合はnullを返す
            if ($e->getMessage() === 'NO CONTENT' || $e->getCode() === 204) {
                return null;
            }

            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ' . $moduleAPIName . 'のレコード検索に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }

            throw $e;
        }
    }

    /**
     * 新しいレコードを作成する
     *
     * @param Record[] $records 作成するレコード
     * @return array 作成結果
     */
    public function insertRecords(array $records)
    {
        if (empty($records)) {
            return [];
        }

        // すべて同じスコープであると仮定
        $scope = $records[0]->getScope();
        $uniqueKey = $records[0]->getUniqueKey();

        try {
            $recordOperations = new RecordOperations($scope);
            $bodyWrapper = new BodyWrapper();
            $apiRecords = [];

            // APIレコードに変換
            foreach ($records as $record) {
                $apiRecord = $this->createZohoRecord($record);
                $apiRecords[] = $apiRecord;
            }

            $bodyWrapper->setData($apiRecords);
            $response = $recordOperations->createRecords($bodyWrapper, new HeaderMap());

            $createdRecords = [];

            if ($response != null && $response->isExpected()) {
                $actionHandler = $response->getObject();

                if ($actionHandler instanceof ActionWrapper) {
                    $actionResponses = $actionHandler->getData();

                    foreach ($actionResponses as $i => $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            $successResponse = $actionResponse;
                            $details = $successResponse->getDetails();

                            // 作成されたレコードを記録
                            $createdRecord = [
                                'record' => $apiRecords[$i],
                                'field' => $records[$i]->getFields(),
                                'scope' => $scope,
                                'details' => $details
                            ];

                            $this->processedRecords[] = $createdRecord;
                            $createdRecords[] = $createdRecord;

                            // ログに記録
                            if (class_exists('AcmsLogger')) {
                                AcmsLogger::info(
                                    '【Zoho plugin】 ' . $scope . 'タブのレコード作成に成功しました。',
                                    ['details' => $details]
                                );
                            }
                        } elseif ($actionResponse instanceof APIException) {
                            $exception = $actionResponse;

                            if (class_exists('AcmsLogger')) {
                                AcmsLogger::error(
                                    '【Zoho plugin】 ' . $scope . 'タブのレコード作成に失敗しました。',
                                    [
                                        'status' => $exception->getStatus()->getValue(),
                                        'code' => $exception->getCode()->getValue(),
                                        'details' => $exception->getDetails(),
                                        'message' => $exception->getMessage() instanceof Choice
                                            ? $exception->getMessage()->getValue()
                                            : $exception->getMessage()
                                    ]
                                );
                            }
                        }
                    }
                }
            }

            return $createdRecords;
        } catch (SDKException $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ' . $scope . 'タブのレコード作成に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }

            return [];
        }
    }

    /**
     * レコードを更新する
     *
     * @param Record[] $records 更新するレコード
     * @return array 更新結果
     */
    public function updateRecords(array $records)
    {
        if (empty($records)) {
            return [];
        }

        // すべて同じスコープであると仮定
        $scope = $records[0]->getScope();
        $uniqueKey = $records[0]->getUniqueKey();

        try {
            $recordOperations = new RecordOperations($scope);
            $bodyWrapper = new BodyWrapper();
            $apiRecords = [];

            // APIレコードに変換
            foreach ($records as $record) {
                if (!$record->getId()) {
                    // エンティティIDがない場合はユニークキーを使って検索
                    $this->setIdByUniqueKey($record, $uniqueKey);
                }

                if ($record->getId()) {
                    $apiRecord = $this->createZohoRecord($record);
                    $apiRecords[] = $apiRecord;
                }
            }

            if (empty($apiRecords)) {
                return [];
            }

            $bodyWrapper->setData($apiRecords);
            $response = $recordOperations->updateRecords($bodyWrapper, new HeaderMap());

            $updatedRecords = [];

            if ($response != null && $response->isExpected()) {
                $actionHandler = $response->getObject();

                if ($actionHandler instanceof ActionWrapper) {
                    $actionResponses = $actionHandler->getData();

                    foreach ($actionResponses as $i => $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            $successResponse = $actionResponse;
                            $details = $successResponse->getDetails();

                            // 更新されたレコードを記録
                            $updatedRecord = [
                                'record' => $apiRecords[$i],
                                'field' => $records[$i]->getFields(),
                                'scope' => $scope,
                                'details' => $details
                            ];

                            $this->processedRecords[] = $updatedRecord;
                            $updatedRecords[] = $updatedRecord;

                            // ログに記録
                            if (class_exists('AcmsLogger')) {
                                AcmsLogger::info(
                                    '【Zoho plugin】 ' . $scope . 'タブのレコード更新に成功しました。',
                                    ['details' => $details]
                                );
                            }
                        } elseif ($actionResponse instanceof APIException) {
                            $exception = $actionResponse;

                            if (class_exists('AcmsLogger')) {
                                AcmsLogger::error(
                                    '【Zoho plugin】 ' . $scope . 'タブのレコード更新に失敗しました。',
                                    [
                                        'status' => $exception->getStatus()->getValue(),
                                        'code' => $exception->getCode()->getValue(),
                                        'details' => $exception->getDetails(),
                                        'message' => $exception->getMessage() instanceof Choice
                                            ? $exception->getMessage()->getValue()
                                            : $exception->getMessage()
                                    ]
                                );
                            }
                        }
                    }
                }
            }

            return $updatedRecords;
        } catch (SDKException $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ' . $scope . 'タブのレコード更新に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }

            return [];
        }
    }

    /**
     * ユニークキーを使用してエンティティIDを設定
     *
     * @param Record $record レコード
     * @param string $uniqueKey ユニークキー
     * @return bool 成功した場合はtrue
     */
    private function setIdByUniqueKey(Record $record, string $uniqueKey)
    {
        $scope = $record->getScope();
        $fields = $record->getFields();

        if (!isset($fields[$uniqueKey]) || empty($fields[$uniqueKey])) {
            return false;
        }

        $uniqueValue = $fields[$uniqueKey];
        $apiName = $this->getApiNameByLabelName($uniqueKey, $scope);

        if (empty($apiName)) {
            return false;
        }

        try {
            $criteria = "(" . $apiName . ":equals:" . $uniqueValue . ")";
            $searchResults = $this->searchRecords($scope, $criteria);

            if ($searchResults && count($searchResults) > 0) {
                $entityId = $searchResults[0]->getId();
                $record->setId($entityId);
                return true;
            }
        } catch (\Exception $e) {
            // 検索に失敗した場合は何もしない
        }

        return false;
    }

    /**
     * Recordオブジェクトを ZohoRecord に変換
     *
     * @param Record $record 変換するレコード
     * @return ZohoRecord 変換されたAPIレコード
     */
    private function createZohoRecord(Record $record): ZohoRecord
    {
        $scope = $record->getScope();
        $apiRecord = new ZohoRecord();

        // エンティティIDがあれば設定
        if ($record->getId()) {
            $apiRecord->setId($record->getId());
        }

        // フィールド値を設定
        foreach ($record->getFields() as $labelName => $value) {
            if (empty($labelName)) {
                continue;
            }

            $apiName = $this->getApiNameByLabelName($labelName, $scope);
            if (empty($apiName)) {
                continue;
            }

            $field = new \com\zoho\crm\api\record\Field($apiName);
            $apiRecord->addFieldValue($field, $value);
        }

        return $apiRecord;
    }

    /**
     * ラベル名からAPI名を取得
     *
     * @param string $labelName ラベル名
     * @param string $moduleName モジュール名
     * @return string API名
     */
    private function getApiNameByLabelName(string $labelName, string $moduleName)
    {
        if (empty($this->labelNameToApiNameMap)) {
            return $labelName; // マップがない場合は元の名前をそのまま返す
        }

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
     * レコードに注釈を追加する
     *
     * @param string $title 注釈のタイトル
     * @param string $content 注釈の内容
     * @param ZohoRecord $record 注釈を追加するレコード
     * @return ZohoRecord 注釈が追加されたレコード
     */
    // public function addNote(string $title, string $content, ZohoRecord $record): ZohoRecord
    // {
    //     try {
    //         $noteRecordOperations = new NotesOperations();
    //         $bodyWrapper = new \com\zoho\crm\api\notes\BodyWrapper();

    //         $note = new \com\zoho\crm\api\notes\Note();
    //         $note->setNoteTitle($title);
    //         $note->setNoteContent($content);

    //         $parentRecord = new \com\zoho\crm\api\notes\Record();
    //         $parentRecord->setId($record->getId());
    //         $note->setParentId($parentRecord);

    //         $bodyWrapper->setData([$note]);

    //         $response = $noteRecordOperations->createNotes($bodyWrapper);

    //         if ($response->isExpected() && class_exists('AcmsLogger')) {
    //             AcmsLogger::info(
    //                 '【Zoho plugin】 ノートの追加に成功しました。',
    //                 ['title' => $title]
    //             );
    //         }
    //     } catch (SDKException $e) {
    //         if (class_exists('AcmsLogger')) {
    //             AcmsLogger::error(
    //                 '【Zoho plugin】 ノートの追加に失敗しました。',
    //                 Common::exceptionArray($e)
    //             );
    //         } else {
    //             userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
    //         }
    //     }

    //     return $record;
    // }

    /**
     * 関連レコードを更新する
     *
     * @param array $relatedScopes 関連スコープ情報
     * @return bool 成功した場合はtrue
     */
    public function updateRelatedRecords(array $relatedScopes)
    {
        $records = $this->processedRecords;

        foreach ($relatedScopes as $i => $relatedScope) {
            $targetScope = $relatedScope['target_scope'] ?? '';
            $lookupId = $relatedScope['lookup_id'] ?? '';
            $compareField = $relatedScope['compare_field'] ?? '';

            if (empty($targetScope) || empty($compareField)) {
                continue;
            }

            // 対象レコードとアイテムを取得
            $targets = array_filter($records, function ($item) use ($targetScope) {
                return $item['scope'] === $targetScope;
            });

            $items = array_filter($records, function ($item) use ($relatedScope) {
                return $item['scope'] === $relatedScope['scope'];
            });

            if (empty($targets) || empty($items)) {
                continue;
            }

            foreach ($targets as $target) {
                foreach ($items as $item) {
                    // 比較フィールドの値を確認
                    $targetField = $target['field'][$compareField] ?? null;
                    $itemField = $item['field'][$compareField] ?? null;

                    if ($targetField === null || $itemField === null || $targetField !== $itemField) {
                        continue;
                    }

                    $parentRecord = $item['record'];
                    $lookupRecord = $target['record'];

                    if ($lookupId) {
                        // ルックアップフィールドを更新
                        $this->updateLookupField($parentRecord, $lookupRecord, $lookupId, $relatedScope['scope']);
                    } else {
                        // 関連レコードを追加
                        // $this->addRelatedRecord($parentRecord, $lookupRecord, $targetScope);
                    }
                }
            }
        }

        return true;
    }

    /**
     * ルックアップフィールドを更新する
     *
     * @param ZohoRecord $parentRecord 親レコード
     * @param ZohoRecord $lookupRecord ルックアップレコード
     * @param string $lookupId ルックアップID
     * @param string $scope スコープ
     * @return bool 成功した場合はtrue
     */
    private function updateLookupField(
        ZohoRecord $parentRecord,
        ZohoRecord $lookupRecord,
        string $lookupId,
        string $scope
    ) {
        $apiName = $this->getApiNameByLabelName($lookupId, $scope);

        if (empty($apiName)) {
            return false;
        }

        try {
            $recordOperations = new RecordOperations($scope);
            $bodyWrapper = new BodyWrapper();

            // ルックアップフィールドの設定
            $lookupData = new ZohoRecord();
            $lookupData->setId($lookupRecord->getId());

            $parentRecord->addKeyValue($apiName, $lookupData);
            $bodyWrapper->setData([$parentRecord]);

            $response = $recordOperations->updateRecords($bodyWrapper, new HeaderMap());

            if ($response->isExpected() && class_exists('AcmsLogger')) {
                AcmsLogger::info(
                    '【Zoho plugin】 ルックアップ項目「' . $lookupId . '(' . $apiName . ')' . '」の更新に成功しました。',
                    ['record_id' => $parentRecord->getId()]
                );
            }

            return true;
        } catch (SDKException $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 ルックアップ項目「' . $lookupId . '(' . $apiName . ')' . '」の更新に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }

            return false;
        }
    }

    /**
     * 関連レコードを追加する
     *
     * @param ZohoRecord $parentRecord 親レコード
     * @param ZohoRecord $relatedRecord 関連レコード
     * @param string $relatedModule 関連モジュール
     * @return bool 成功した場合はtrue
     */
    // private function addRelatedRecord(ZohoRecord $parentRecord, ZohoRecord $relatedRecord, string $relatedModule): bool
    // {
    //     try {
    //         $relationshipName = $this->getRelationshipName($parentRecord->getModule(), $relatedModule);

    //         if (empty($relationshipName)) {
    //             return false;
    //         }

    //         $relatedRecordsOperations = new \com\zoho\crm\api\related_records\RelatedRecordsOperations(
    //             $relationshipName,
    //             $parentRecord->getModule(),
    //             $parentRecord->getId()
    //         );

    //         $bodyWrapper = new \com\zoho\crm\api\related_records\BodyWrapper();
    //         $bodyWrapper->setData([$relatedRecord]);

    //         $response = $relatedRecordsOperations->updateRelatedRecords($bodyWrapper);

    //         if ($response->isExpected() && class_exists('AcmsLogger')) {
    //             AcmsLogger::info(
    //                 '【Zoho plugin】 関連レコードの追加に成功しました。',
    //                 [
    //                     'parent_id' => $parentRecord->getId(),
    //                     'related_id' => $relatedRecord->getId()
    //                 ]
    //             );
    //         }

    //         return true;
    //     } catch (SDKException $e) {
    //         if (class_exists('AcmsLogger')) {
    //             AcmsLogger::error(
    //                 '【Zoho plugin】 関連レコードの追加に失敗しました。',
    //                 Common::exceptionArray($e)
    //             );
    //         } else {
    //             userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
    //         }

    //         return false;
    //     }
    // }

    /**
     * リレーションシップ名を取得する
     *
     * @param string $moduleAPIName モジュールAPI名
     * @param string $relatedModuleAPIName 関連モジュールAPI名
     * @return string リレーションシップ名
     */
    // private function getRelationshipName(string $moduleAPIName, string $relatedModuleAPIName): string
    // {
    //     // モジュール間の関係名はZoho CRMの設定に依存
    //     // 一般的な関係名のパターンを返す
    //     return $relatedModuleAPIName;
    // }

    /**
     * ログ出力用にZohoRecordオブジェクトをフォーマットする
     *
     * @param ZohoRecord $record
     * @return array
     */
    // public function recordToArray(ZohoRecord $record): array
    // {
    //     return [
    //         'id' => $record->getId(),
    //         'module' => $record->getModule(),
    //         'fields' => $record->getKeyValues()
    //     ];
    // }

    /**
     * Zoho CRMからモジュール情報を取得
     *
     * @return ZohoModules[] モジュール情報の配列
     */
    public function getModules(): array
    {
        try {
            if (is_null($this->client)) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::error('【Zoho plugin】 Zohoクライアントの初期化に失敗しました。');
                }
                return [];
            }

            // モジュール操作用のクラスをインスタンス化
            $moduleOperations = new ModulesOperations();
            $headerInstance = new HeaderMap();

            // モジュール一覧を取得
            $response = $moduleOperations->getModules(null, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseObject = $response->getObject();

                if ($responseObject instanceof ResponseWrapper) {
                    $modules = $responseObject->getModules();
                    $moduleInfoList = [];

                    foreach ($modules as $module) {
                        $moduleInfo = [
                            // 'id' => $module->getId(),
                            // 'apiName' => $module->getAPIName(),
                            // 'moduleName' => $module->getModuleName(),
                            // 'generatedType' => $module->getGeneratedType()->getValue(),
                            // 'isVisible' => $module->getVisible(),
                            // 'creatable' => $module->getCreatable()
                        ];

                        // 各モジュールのフィールド情報を取得
                        // $moduleInfo['fields'] = $this->getModuleFields($module->getAPIName());

                        // $moduleInfoList[] = $moduleInfo;

                        $moduleInfoList[] = $module;
                    }

                    return $moduleInfoList;
                }
            }

            return [];
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 モジュール情報の取得に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
            return [];
        }
    }

    /**
     * 特定のモジュールのフィールド情報を取得
     *
     * @param string $moduleApiName モジュールのAPI名
     * @return array フィールド情報の配列
     */
    private function getModuleFields(string $moduleApiName): array
    {
        try {
            // フィールド操作用のクラスをインスタンス化
            $fieldOperations = new FieldsOperations($moduleApiName);
            $paramInstance = new ParameterMap();

            // フィールド一覧を取得
            $response = $fieldOperations->getFields($paramInstance);

            if ($response != null && $response->isExpected()) {
                $responseObject = $response->getObject();

                if ($responseObject instanceof FieldsResponseWrapper) {
                    $fields = $responseObject->getFields();
                    $fieldInfoList = [];

                    foreach ($fields as $field) {
                        $fieldInfo = [
                            'id' => $field->getId(),
                            'apiName' => $field->getAPIName(),
                            'fieldLabel' => $field->getFieldLabel(),
                            'dataType' => $field->getDataType(),
                            'required' => $field->getSystemMandatory()
                        ];

                        $fieldInfoList[] = $fieldInfo;
                    }

                    return $fieldInfoList;
                }
            }

            return [];
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 フィールド情報の取得に失敗しました。',
                    ['module' => $moduleApiName, 'error' => Common::exceptionArray($e)]
                );
            }
            return [];
        }
    }
}
