<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
use Acms\Plugins\Zoho\Services\Zoho\Builder\ProcessedRecordsCollection;
use AcmsLogger;

use com\zoho\crm\api\record\Record as ZohoRecord;
use com\zoho\crm\api\HeaderMap;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\record\RecordOperations;
use com\zoho\crm\api\record\GetRecordsParam;
use com\zoho\crm\api\record\SearchRecordsParam;
use com\zoho\crm\api\record\ActionWrapper;
use com\zoho\crm\api\record\APIException;
use com\zoho\crm\api\record\BodyWrapper;
use com\zoho\crm\api\record\SuccessResponse;
use com\zoho\crm\api\util\Choice;

class RecordApi extends ApiBase
{
    /** @var ProcessedRecordsCollection 処理済みレコードのコレクション */
    private $processedRecords;

    /**
     * コンストラクタ
     */
    public function __construct(Client $client)
    {
        parent::__construct($client);
        $this->processedRecords = new ProcessedRecordsCollection();
    }

    /**
     * 処理済みレコードのコレクションを取得
     *
     * @return ProcessedRecordsCollection
     */
    public function getProcessedRecords()
    {
        return $this->processedRecords;
    }

    /**
     * レコードを取得する
     *
     * @param string $moduleAPIName モジュールAPI名
     * @param array $fields 取得するフィールド名のリスト
     * @return array|null 取得されたレコードの配列、失敗時はnull
     */
    // public function getRecords(string $moduleAPIName, array $fields = ["id", "Email"])
    // {
    //     try {
    //         $recordOperations = new RecordOperations();
    //         $paramInstance = new ParameterMap();
    //         $headerInstance = new HeaderMap();

    //         foreach ($fields as $field) {
    //             $paramInstance->add(GetRecordsParam::fields(), $field);
    //         }

    //         $response = $recordOperations->getRecords($moduleAPIName, $paramInstance, $headerInstance);

    //         if ($response != null) {
    //             $responseHandler = $response->getObject();

    //             if ($responseHandler instanceof \com\zoho\crm\api\record\ResponseWrapper) {
    //                 $records = $responseHandler->getData();
    //                 $result = [];

    //                 foreach ($records as $record) {
    //                     $recordData = [];
    //                     foreach ($record->getKeyValues() as $keyName => $value) {
    //                         $recordData[$keyName] = $value;
    //                     }
    //                     $result[] = $recordData;
    //                 }

    //                 return $result;
    //             } else if ($responseHandler instanceof APIException) {
    //                 AcmsLogger::info('Zoho API Exception in getRecords: ' . $responseHandler->getMessage());
    //             }
    //         }
    //     } catch (\Exception $e) {
    //         AcmsLogger::info('Exception in getRecords: ' . $e->getMessage());
    //     }

    //     return null;
    // }

    /**
     * ユニークキーでレコードを検索
     *
     * @param string $moduleApiName モジュールAPI名
     * @param string $fieldName フィールド名（ラベル名）
     * @param mixed $value 検索値
     * @return array|null 見つかったレコード ['id' => ..., 'fields' => [...]]、見つからない場合はnull
     */
    public function searchByUniqueKey(string $moduleApiName, string $fieldName, $value)
    {
        try {
            // フィールドのAPI名を取得
            $apiName = $this->getApiNameByLabelName($fieldName, $moduleApiName);

            // AcmsLogger::info('【Zoho Debug】searchByUniqueKey開始', [
            //     'moduleApiName' => $moduleApiName,
            //     'fieldName' => $fieldName,
            //     'apiName' => $apiName,
            //     'value' => $value
            // ]);

            if (empty($apiName)) {
                AcmsLogger::info('【Zoho Debug】API名が取得できませんでした');
                return null;
            }

            // 検索条件を構築
            $criteria = "({$apiName}:equals:{$value})";

            $recordOperations = new RecordOperations($moduleApiName);
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();

            $paramInstance->add(SearchRecordsParam::criteria(), $criteria);

            $response = $recordOperations->searchRecords($paramInstance, $headerInstance);

            if ($response != null) {
                // AcmsLogger::info('【Zoho Debug】Response details', [
                //     'moduleApiName' => $moduleApiName,
                //     'statusCode' => $response->getStatusCode(),
                //     'isExpected' => $response->isExpected()
                // ]);

                $responseHandler = $response->getObject();

                if ($responseHandler === null) {
                    AcmsLogger::info('【Zoho Debug】ResponseHandler is null', [
                        'moduleApiName' => $moduleApiName,
                        'responseStatusCode' => $response->getStatusCode(),
                        'responseHeaders' => $response->getHeaders()
                    ]);
                } else if ($responseHandler instanceof \com\zoho\crm\api\record\ResponseWrapper) {
                    $records = $responseHandler->getData();

                    AcmsLogger::info('【Zoho Debug】検索結果', [
                        'moduleApiName' => $moduleApiName,
                        'recordCount' => $records ? count($records) : 0
                    ]);

                    if (!empty($records) && count($records) > 0) {
                        $record = $records[0]; // 最初のレコードを返す
                        return [
                            'id' => $record->getId(),
                            'fields' => $record->getKeyValues()
                        ];
                    }
                } else if ($responseHandler instanceof APIException) {
                    $message = $responseHandler->getMessage();
                    if ($message instanceof Choice) {
                        $message = $message->getValue();
                    }
                    AcmsLogger::info('【Zoho Debug】API Exception in searchByUniqueKey', [
                        'moduleApiName' => $moduleApiName,
                        'message' => $message,
                        'code' => $responseHandler->getCode(),
                        'status' => $responseHandler->getStatus()
                    ]);
                } else {
                    AcmsLogger::info('【Zoho Debug】Unexpected response type', [
                        'moduleApiName' => $moduleApiName,
                        'type' => get_class($responseHandler)
                    ]);
                }
            } else {
                AcmsLogger::info('【Zoho Debug】Response is null', [
                    'moduleApiName' => $moduleApiName
                ]);
            }
        } catch (\Exception $e) {
            AcmsLogger::info('【Zoho Debug】Exception in searchByUniqueKey', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        return null;
    }

    /**
     * レコードを検索する
     *
     * @param string $moduleAPIName モジュールAPI名
     * @param string $criteria 検索条件
     * @return array|null 検索されたレコードの配列、失敗時はnull
     */
    // public function searchRecords(string $moduleAPIName, string $criteria)
    // {
    //     try {
    //         $recordOperations = new RecordOperations();
    //         $paramInstance = new ParameterMap();
    //         $headerInstance = new HeaderMap();

    //         $paramInstance->add(SearchRecordsParam::criteria(), $criteria);

    //         $response = $recordOperations->searchRecords($moduleAPIName, $paramInstance, $headerInstance);

    //         if ($response != null) {
    //             $responseHandler = $response->getObject();

    //             if ($responseHandler instanceof \com\zoho\crm\api\record\ResponseWrapper) {
    //                 $records = $responseHandler->getData();
    //                 $result = [];

    //                 foreach ($records as $record) {
    //                     $recordData = [];
    //                     foreach ($record->getKeyValues() as $keyName => $value) {
    //                         $recordData[$keyName] = $value;
    //                     }
    //                     $result[] = $recordData;
    //                 }

    //                 return $result;
    //             } else if ($responseHandler instanceof APIException) {
    //                 AcmsLogger::info('Zoho API Exception in searchRecords: ' . $responseHandler->getMessage());
    //             }
    //         }
    //     } catch (\Exception $e) {
    //         AcmsLogger::info('Exception in searchRecords: ' . $e->getMessage());
    //     }

    //     return null;
    // }

    /**
     * レコードを挿入する
     *
     * @param Record[] $records 挿入するRecordModelの配列
     * @return bool 成功した場合はtrue
     */
    public function insertRecords(array $records)
    {
        if (empty($records)) {
            return false;
        }

        $recordsList = [];
        $moduleApiName = null;

        foreach ($records as $record) {
            if (!($record instanceof Record)) {
                continue;
            }

            if ($moduleApiName === null) {
                $moduleApiName = $record->getModuleApiName();
            }

            $recordsList[] = $this->createZohoRecord($record);
        }

        if (empty($recordsList) || $moduleApiName === null) {
            return false;
        }

        try {
            AcmsLogger::info('【Zoho Debug】insertRecords実行前', [
                'moduleApiName' => $moduleApiName,
                'recordsCount' => count($recordsList)
            ]);

            $recordOperations = new RecordOperations($moduleApiName);
            $request = new BodyWrapper();
            $request->setData($recordsList);

            $headerInstance = new HeaderMap();
            $response = $recordOperations->createRecords($request, $headerInstance);

            if ($response != null) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ActionWrapper) {
                    $actionResponses = $responseHandler->getData();

                    foreach ($actionResponses as $index => $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            // 作成されたレコードのIDを設定
                            $details = $actionResponse->getDetails();
                            if (is_array($details) && isset($details['id'])) {
                                $createdRecordId = $details['id'];
                            } elseif (is_object($details) && method_exists($details, 'get')) {
                                $createdRecordId = $details->get('id');
                            } else {
                                AcmsLogger::info('【Zoho Debug】IDの取得に失敗', [
                                    'detailsType' => gettype($details),
                                    'details' => $details
                                ]);
                                continue;
                            }
                            $records[$index]->setId($createdRecordId);

                            // コレクションに追加
                            $this->processedRecords->add($records[$index]);
                        } else if ($actionResponse instanceof APIException) {
                            $message = $actionResponse->getMessage();
                            $details = $actionResponse->getDetails();

                            // メッセージがChoiceオブジェクトの場合は値を取得
                            if ($message instanceof Choice) {
                                $message = $message->getValue();
                            }

                            // 詳細情報も含めてログ出力
                            $errorInfo = [
                                'message' => $message,
                                'code' => $actionResponse->getCode(),
                                'status' => $actionResponse->getStatus(),
                                'details' => $details,
                            ];

                            AcmsLogger::info('Zoho API Exception in insertRecords', $errorInfo);
                        }
                    }

                    return !$this->processedRecords->isEmpty();
                } else if ($responseHandler instanceof APIException) {
                    $message = $responseHandler->getMessage();
                    if ($message instanceof Choice) {
                        $message = $message->getValue();
                    }
                    AcmsLogger::info('Zoho API Exception in insertRecords: ' . $message);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in insertRecords', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        return false;
    }

    /**
     * レコードを更新する
     *
     * @param Record[] $records 更新するRecordModelの配列
     * @return bool 成功した場合はtrue
     */
    public function updateRecords(array $records)
    {
        if (empty($records)) {
            return false;
        }

        $recordsList = [];
        $moduleApiName = null;

        foreach ($records as $record) {
            if (!($record instanceof Record)) {
                continue;
            }

            if (!$record->getId()) {
                $this->setIdByUniqueKey($record, 'Email');
            }

            if (!$record->getId()) {
                continue;
            }

            if ($moduleApiName === null) {
                $moduleApiName = $record->getModuleApiName();
            }

            $recordsList[] = $this->createZohoRecord($record);
        }

        if (empty($recordsList) || $moduleApiName === null) {
            return false;
        }

        try {
            $recordOperations = new RecordOperations($moduleApiName);
            $request = new BodyWrapper();
            $request->setData($recordsList);

            $headerInstance = new HeaderMap();
            $response = $recordOperations->updateRecords($request, $headerInstance);

            if ($response != null) {
                $statusCode = $response->getStatusCode();
                $responseHandler = $response->getObject();

                // HTTP 204 (No Content) は更新成功だがレスポンスボディが空
                if ($statusCode === 204) {
                    foreach ($records as $record) {
                        $this->processedRecords->add($record);
                    }
                    AcmsLogger::info('【Zoho Success】レコードの更新が成功しました (HTTP 204)', [
                        'moduleApiName' => $moduleApiName,
                        'recordsCount' => count($records)
                    ]);
                    return true;
                }

                if ($responseHandler instanceof ActionWrapper) {
                    $actionResponses = $responseHandler->getData();

                    foreach ($actionResponses as $index => $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            // コレクションに追加
                            $this->processedRecords->add($records[$index]);
                        } else if ($actionResponse instanceof APIException) {
                            $message = $actionResponse->getMessage();
                            $details = $actionResponse->getDetails();

                            // メッセージがChoiceオブジェクトの場合は値を取得
                            if ($message instanceof Choice) {
                                $message = $message->getValue();
                            }

                            // 詳細情報も含めてログ出力
                            $errorInfo = [
                                'message' => $message,
                                'code' => $actionResponse->getCode(),
                                'status' => $actionResponse->getStatus(),
                                'details' => $details,
                            ];

                            AcmsLogger::info('Zoho API Exception in updateRecords', $errorInfo);
                        }
                    }

                    return !$this->processedRecords->isEmpty();
                } else if ($responseHandler instanceof APIException) {
                    $message = $responseHandler->getMessage();
                    if ($message instanceof Choice) {
                        $message = $message->getValue();
                    }
                    AcmsLogger::info('Zoho API Exception in updateRecords: ' . $message);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::error('Exception in updateRecords', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'moduleApiName' => $moduleApiName ?? 'unknown',
                'recordsCount' => count($records),
                'records' => array_map(function($r) {
                    return [
                        'module' => $r->getModuleApiName(),
                        'id' => $r->getId(),
                        'fields' => $r->getFields()
                    ];
                }, $records),
                'trace' => $e->getTraceAsString()
            ]);
        }

        return false;
    }

    /**
     * ユニークキーでレコードのIDを設定
     *
     * @param Record $record レコード
     * @param string $uniqueKey ユニークキー
     * @return bool 成功した場合はtrue
     */
    private function setIdByUniqueKey(Record $record, string $uniqueKey)
    {
        $scope = $record->getModuleApiName();
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
            // TODO: searchRecordsメソッドを実装する必要があります
            // $searchResults = $this->searchRecords($scope, $criteria);

            // if ($searchResults && count($searchResults) > 0) {
            //     $entityId = $searchResults[0]['id'];
            //     $record->setId($entityId);
            //     return true;
            // }
        } catch (\Exception $e) {
            // 検索に失敗した場合は何もしない
        }

        return false;
    }

    /**
     * 関連レコードを更新する
     *
     * @param array $relatedScopes 関連スコープの配列
     * @return bool 成功した場合はtrue
     */
    // public function updateRelatedRecords(array $relatedScopes)
    // {
    //     $records = $this->getProcessedRecords();

    //     foreach ($relatedScopes as $relatedScope) {
    //         $targetScope = $relatedScope['target'];

    //         $targets = array_filter($records, function ($item) use ($targetScope) {
    //             return $item->getScope() === $targetScope;
    //         });

    //         $items = array_filter($records, function ($item) use ($relatedScope) {
    //             return $item->getScope() === $relatedScope['scope'];
    //         });

    //         foreach ($targets as $target) {
    //             foreach ($items as $item) {
    //                 if ($this->updateLookupField(
    //                     $item,
    //                     $relatedScope['field'],
    //                     $target,
    //                     $relatedScope['targetField']
    //                 )) {
    //                     $this->updateRecords([$item]);
    //                 }
    //             }
    //         }
    //     }

    //     return true;
    // }

    /**
     * ルックアップフィールドを更新する
     *
     * @param Record $record 更新するレコード
     * @param string $lookupField ルックアップフィールド名
     * @param Record $relatedRecord 関連レコード
     * @param string $relatedField 関連フィールド名
     * @return bool 成功した場合はtrue
     */
    // private function updateLookupField(
    //     Record $record,
    //     string $lookupField,
    //     Record $relatedRecord,
    //     string $relatedField
    // ) {
    //     $relatedFields = $relatedRecord->getFields();

    //     if (!isset($relatedFields[$relatedField])) {
    //         return false;
    //     }

    //     $relatedValue = $relatedFields[$relatedField];
    //     $record->addField($lookupField, $relatedValue);

    //     return true;
    // }

    /**
     * Recordオブジェクトを ZohoRecord に変換
     *
     * @param Record $record 変換するレコード
     * @return ZohoRecord 変換されたAPIレコード
     */
    private function createZohoRecord(Record $record): ZohoRecord
    {
        $scope = $record->getModuleApiName();

        AcmsLogger::info('【Zoho Debug】createZohoRecord開始', [
            'scope' => $scope,
            'recordId' => $record->getId(),
            'fieldsCount' => count($record->getFields()),
            'fields' => $record->getFields()
        ]);

        $apiRecord = new ZohoRecord();

        if ($record->getId()) {
            $apiRecord->setId($record->getId());
        }

        // フィールドのキーは既にAPI名なので、変換不要
        foreach ($record->getFields() as $apiName => $value) {
            if (empty($apiName)) {
                AcmsLogger::info('【Zoho Debug】空のAPI名をスキップ');
                continue;
            }

            // 空文字列の値はスキップ（Zoho SDKの検証エラーを回避）
            if ($value === '') {
                continue;
            }

            // AcmsLogger::info('【Zoho Debug】フィールド追加', [
            //     'apiName' => $apiName,
            //     'value' => $value,
            //     'valueType' => gettype($value),
            //     'isLookup' => $record->isLookupField($apiName)
            // ]);

            // ルックアップフィールドの場合、ZohoRecordオブジェクトに変換
            if ($record->isLookupField($apiName)) {
                $lookupRecord = new ZohoRecord();
                $lookupRecord->setId($value);
                $fieldValue = $lookupRecord;
            } elseif ($record->isPicklistField($apiName)) {
                // ピックリストフィールドはChoiceオブジェクトとして設定
                $fieldValue = new Choice($value);
            } else {
                $fieldValue = $value;
            }

            try {
                $field = new \com\zoho\crm\api\record\Field($apiName);
                $apiRecord->addFieldValue($field, $fieldValue);
            } catch (\Exception $e) {
                // フィールドがモジュールに存在しない場合などのエラーをログに記録してスキップ
                AcmsLogger::warning('【Zoho Warning】フィールドの追加に失敗しました（スキップします）', [
                    'module' => $scope,
                    'field' => $apiName,
                    'value' => $value,
                    'error' => $e->getMessage()
                ]);
                continue;
            }
        }

        return $apiRecord;
    }
}
