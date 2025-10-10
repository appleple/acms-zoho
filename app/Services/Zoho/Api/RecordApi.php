<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
use AcmsLogger;

use com\zoho\crm\api\record\Record as ZohoRecord;
use com\zoho\crm\api\HeaderMap;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\record\RecordOperations;
use com\zoho\crm\api\record\SearchRecordsParam;
use com\zoho\crm\api\record\ActionWrapper;
use com\zoho\crm\api\record\APIException;
use com\zoho\crm\api\record\BodyWrapper;
use com\zoho\crm\api\record\SuccessResponse;
use com\zoho\crm\api\util\Choice;

class RecordApi extends ApiBase
{

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

            if (empty($apiName)) {
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
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof \com\zoho\crm\api\record\ResponseWrapper) {
                    $records = $responseHandler->getData();

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
                    AcmsLogger::error('【Zoho plugin】レコード検索でエラーが発生しました。', [
                        'message' => $message,
                        'code' => $responseHandler->getCode()
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】レコード検索で例外が発生しました。', [
                'message' => $e->getMessage()
            ]);
        }

        return null;
    }

    /**
     * レコードを挿入する
     *
     * @param Record[] $records 挿入するRecordModelの配列
     * @return array ['success' => int, 'failures' => array] 成功数と失敗情報の配列
     */
    public function insertRecords(array $records)
    {
        $result = ['success' => 0, 'failures' => []];

        if (empty($records)) {
            return $result;
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
            return $result;
        }

        try {
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
                                continue;
                            }
                            $records[$index]->setId($createdRecordId);
                            $result['success']++;
                        } else if ($actionResponse instanceof APIException) {
                            $message = $actionResponse->getMessage();

                            // メッセージがChoiceオブジェクトの場合は値を取得
                            if ($message instanceof Choice) {
                                $message = $message->getValue();
                            }

                            $result['failures'][] = [
                                'module' => $moduleApiName,
                                'type' => 'create',
                                'fields' => $records[$index]->getFields(),
                                'message' => $message,
                                'code' => $actionResponse->getCode()
                            ];
                        }
                    }

                    return $result;
                } else if ($responseHandler instanceof APIException) {
                    $message = $responseHandler->getMessage();
                    if ($message instanceof Choice) {
                        $message = $message->getValue();
                    }
                    $result['failures'][] = [
                        'module' => $moduleApiName,
                        'type' => 'create',
                        'message' => $message
                    ];
                }
            }
        } catch (\Exception $e) {
            $result['failures'][] = [
                'module' => $moduleApiName,
                'type' => 'create',
                'message' => $e->getMessage()
            ];
        }

        return $result;
    }

    /**
     * レコードを更新する
     *
     * @param Record[] $records 更新するRecordModelの配列
     * @return array ['success' => int, 'failures' => array] 成功数と失敗情報の配列
     */
    public function updateRecords(array $records)
    {
        $result = ['success' => 0, 'failures' => []];

        if (empty($records)) {
            return $result;
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
            return $result;
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
                    $result['success'] = count($records);
                    return $result;
                }

                if ($responseHandler instanceof ActionWrapper) {
                    $actionResponses = $responseHandler->getData();

                    foreach ($actionResponses as $index => $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            $result['success']++;
                        } else if ($actionResponse instanceof APIException) {
                            $message = $actionResponse->getMessage();

                            // メッセージがChoiceオブジェクトの場合は値を取得
                            if ($message instanceof Choice) {
                                $message = $message->getValue();
                            }

                            $result['failures'][] = [
                                'module' => $moduleApiName,
                                'type' => 'update',
                                'id' => $records[$index]->getId(),
                                'fields' => $records[$index]->getFields(),
                                'message' => $message,
                                'code' => $actionResponse->getCode()
                            ];
                        }
                    }

                    return $result;
                } else if ($responseHandler instanceof APIException) {
                    $message = $responseHandler->getMessage();
                    if ($message instanceof Choice) {
                        $message = $message->getValue();
                    }
                    $result['failures'][] = [
                        'module' => $moduleApiName,
                        'type' => 'update',
                        'message' => $message
                    ];
                }
            }
        } catch (\Exception $e) {
            $result['failures'][] = [
                'module' => $moduleApiName,
                'type' => 'update',
                'message' => $e->getMessage()
            ];
        }

        return $result;
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
        $scope = $record->getModuleApiName();

        $apiRecord = new ZohoRecord();

        if ($record->getId()) {
            $apiRecord->setId($record->getId());
        }

        // フィールドのキーは既にAPI名なので、変換不要
        foreach ($record->getFields() as $apiName => $value) {
            if (empty($apiName)) {
                continue;
            }

            // 空文字列の値はスキップ（Zoho SDKの検証エラーを回避）
            if ($value === '') {
                continue;
            }

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
                AcmsLogger::error('【Zoho plugin】フィールドの追加に失敗しました。', [
                    'error' => $e->getMessage()
                ]);
                continue;
            }
        }

        return $apiRecord;
    }
}
