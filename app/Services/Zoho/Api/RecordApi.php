<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
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

class RecordApi extends ApiBase
{
    /** @var array 処理済みレコードのリスト */
    private $processedRecords = [];

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
     * @param array $records 挿入するレコードの配列
     * @return bool 成功した場合はtrue
     */
    public function insertRecords(array $records)
    {
        if (empty($records)) {
            return false;
        }

        $recordsList = [];
        foreach ($records as $record) {
            if (!($record instanceof Record)) {
                continue;
            }

            $recordsList[] = $this->createZohoRecord($record);
        }

        if (empty($recordsList)) {
            return false;
        }

        try {
            $moduleApiName = $records[0]->getModuleApiName();
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
                            $this->processedRecords[] = $records[$index];
                        } else if ($actionResponse instanceof APIException) {
                            AcmsLogger::info('Zoho API Exception in insertRecords: ' . $actionResponse->getMessage());
                        }
                    }

                    return !empty($this->processedRecords);
                } else if ($responseHandler instanceof APIException) {
                    AcmsLogger::info('Zoho API Exception in insertRecords: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in insertRecords: ' . $e->getMessage());
        }

        return false;
    }

    /**
     * レコードを更新する
     *
     * @param array $records 更新するレコードの配列
     * @return bool 成功した場合はtrue
     */
    public function updateRecords(array $records)
    {
        if (empty($records)) {
            return false;
        }

        $recordsList = [];
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

            $recordsList[] = $this->createZohoRecord($record);
        }

        if (empty($recordsList)) {
            return false;
        }

        try {
            $moduleApiName = $records[0]->getModuleApiName();
            $recordOperations = new RecordOperations($moduleApiName);
            $request = new BodyWrapper();
            $request->setData($recordsList);

            $headerInstance = new HeaderMap();
            $response = $recordOperations->updateRecords($request, $headerInstance);

            if ($response != null) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ActionWrapper) {
                    $actionResponses = $responseHandler->getData();

                    foreach ($actionResponses as $index => $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            $this->processedRecords[] = $records[$index];
                        } else if ($actionResponse instanceof APIException) {
                            AcmsLogger::info('Zoho API Exception in updateRecords: ' . $actionResponse->getMessage());
                        }
                    }

                    return !empty($this->processedRecords);
                } else if ($responseHandler instanceof APIException) {
                    AcmsLogger::info('Zoho API Exception in updateRecords: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in updateRecords: ' . $e->getMessage());
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
        $apiRecord = new ZohoRecord();

        if ($record->getId()) {
            $apiRecord->setId($record->getId());
        }

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
}
