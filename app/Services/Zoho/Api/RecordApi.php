<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Plugins\Zoho\Services\Zoho\Api\FieldApi;
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
use DateTime;

class RecordApi extends ApiBase
{
    /** @var array モジュールごとのフィールドメタデータキャッシュ */
    private $fieldMetadataCache = [];

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
                } elseif ($responseHandler instanceof APIException) {
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
        return $this->processRecords($records, 'create');
    }

    /**
     * レコードを更新する
     *
     * @param Record[] $records 更新するRecordModelの配列
     * @return array ['success' => int, 'failures' => array] 成功数と失敗情報の配列
     */
    public function updateRecords(array $records)
    {
        return $this->processRecords($records, 'update');
    }

    /**
     * レコードの作成または更新を処理する共通メソッド
     *
     * @param Record[] $records 処理するRecordModelの配列
     * @param string $operationType 操作タイプ ('create' または 'update')
     * @return array ['success' => int, 'failures' => array] 成功数と失敗情報の配列
     */
    private function processRecords(array $records, string $operationType)
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

            // updateの場合のみ、IDの設定を確認
            if ($operationType === 'update') {
                if (!$record->getId()) {
                    $this->setIdByUniqueKey($record, 'Email');
                }

                if (!$record->getId()) {
                    continue;
                }
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

            // 操作タイプに応じてAPIメソッドを切り替え
            if ($operationType === 'create') {
                $response = $recordOperations->createRecords($request, $headerInstance);
            } else {
                $response = $recordOperations->updateRecords($request, $headerInstance);
            }

            if ($response != null) {
                $statusCode = $response->getStatusCode();
                $responseHandler = $response->getObject();

                // HTTP 204 (No Content) は更新成功だがレスポンスボディが空
                if ($statusCode === 204) {
                    $result['success'] = count($records);
                    return $result;
                }

                if ($responseHandler instanceof ActionWrapper) {
                    $result = $this->handleActionResponses(
                        $responseHandler->getData(),
                        $records,
                        $moduleApiName,
                        $operationType,
                        $result
                    );
                    return $result;
                } elseif ($responseHandler instanceof APIException) {
                    $failure = $this->createFailureFromAPIException(
                        $responseHandler,
                        $moduleApiName,
                        $operationType
                    );
                    $result['failures'][] = $failure;
                }
            }
        } catch (\Exception $e) {
            $result['failures'][] = [
                'module' => $moduleApiName,
                'type' => $operationType,
                'message' => $e->getMessage() ?: 'エラーメッセージが取得できませんでした',
                'exception' => get_class($e),
                'trace' => $e->getTraceAsString()
            ];
        }

        return $result;
    }

    /**
     * ActionResponsesを処理する
     *
     * @param array $actionResponses アクションレスポンスの配列
     * @param Record[] $records 処理したレコードの配列
     * @param string $moduleApiName モジュールAPI名
     * @param string $operationType 操作タイプ
     * @param array $result 結果配列
     * @return array 更新された結果配列
     */
    private function handleActionResponses(
        array $actionResponses,
        array $records,
        string $moduleApiName,
        string $operationType,
        array $result
    ) {
        foreach ($actionResponses as $index => $actionResponse) {
            if ($actionResponse instanceof SuccessResponse) {
                // createの場合のみ、作成されたレコードのIDを設定
                if ($operationType === 'create') {
                    $details = $actionResponse->getDetails();
                    $createdRecordId = $this->extractRecordId($details);
                    if ($createdRecordId) {
                        $records[$index]->setId($createdRecordId);
                    }
                }
                $result['success']++;
            } elseif ($actionResponse instanceof APIException) {
                $message = $this->extractChoiceValue($actionResponse->getMessage());

                $failure = [
                    'module' => $moduleApiName,
                    'type' => $operationType,
                    'message' => $message,
                    'code' => $actionResponse->getCode()
                ];

                // updateの場合はIDを含める
                if ($operationType === 'update') {
                    $failure['id'] = $records[$index]->getId();
                }

                // createの場合はfieldsを含める
                if ($operationType === 'create') {
                    $failure['fields'] = $records[$index]->getFields();
                }

                $result['failures'][] = $failure;
            }
        }

        return $result;
    }

    /**
     * APIExceptionから失敗情報を作成する
     *
     * @param APIException $exception API例外
     * @param string $moduleApiName モジュールAPI名
     * @param string $operationType 操作タイプ
     * @return array 失敗情報
     */
    private function createFailureFromAPIException(
        APIException $exception,
        string $moduleApiName,
        string $operationType
    ) {
        $message = $this->extractChoiceValue($exception->getMessage());
        $code = $this->extractChoiceValue($exception->getCode());

        return [
            'module' => $moduleApiName,
            'type' => $operationType,
            'message' => $message ?: 'エラーメッセージが取得できませんでした',
            'code' => $code,
            'details' => $exception->getDetails()
        ];
    }

    /**
     * Choiceオブジェクトから値を取得する
     *
     * @param mixed $value Choiceオブジェクトまたは文字列
     * @return mixed 抽出された値
     */
    private function extractChoiceValue($value)
    {
        if ($value instanceof Choice) {
            return $value->getValue();
        }
        return $value;
    }

    /**
     * レコードIDを抽出する
     *
     * @param mixed $details レスポンスの詳細
     * @return string|null レコードID
     */
    private function extractRecordId($details)
    {
        if (is_array($details) && isset($details['id'])) {
            return $details['id'];
        } elseif (is_object($details) && method_exists($details, 'get')) {
            return $details->get('id');
        }
        return null;
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

        // searchByUniqueKeyメソッドを使って既存レコードを検索
        $existingRecord = $this->searchByUniqueKey($scope, $uniqueKey, $uniqueValue);

        if ($existingRecord && isset($existingRecord['id'])) {
            $record->setId($existingRecord['id']);
            return true;
        }

        return false;
    }

    /**
     * モジュールのフィールドメタデータを取得（キャッシュ付き）
     *
     * @param string $moduleApiName モジュールAPI名
     * @return array フィールドメタデータの配列 [apiName => dataType]
     */
    private function getFieldMetadata(string $moduleApiName): array
    {
        if (isset($this->fieldMetadataCache[$moduleApiName])) {
            return $this->fieldMetadataCache[$moduleApiName];
        }

        // FieldApiを使ってフィールド情報を取得
        $fieldApi = new FieldApi($this->client);
        $fields = $fieldApi->getModuleFields($moduleApiName);

        $metadata = [];
        foreach ($fields as $field) {
            $apiName = $field['api_name'] ?? null;
            $dataType = $field['data_type'] ?? null;

            if ($apiName && $dataType) {
                $metadata[$apiName] = $dataType;
            }
        }

        $this->fieldMetadataCache[$moduleApiName] = $metadata;
        return $metadata;
    }

    /**
     * フィールドのデータタイプを取得
     *
     * @param string $moduleApiName モジュールAPI名
     * @param string $fieldApiName フィールドAPI名
     * @return string|null データタイプ
     */
    private function getFieldDataType(string $moduleApiName, string $fieldApiName): ?string
    {
        $metadata = $this->getFieldMetadata($moduleApiName);
        return $metadata[$fieldApiName] ?? null;
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

            // フィールドのデータタイプを取得（メタデータから動的に判定）
            $dataType = $this->getFieldDataType($scope, $apiName);

            // 複数行テキストフィールドの判定（メタデータから取得した情報も考慮）
            $isTextarea = $record->isTextareaField($apiName) || $dataType === 'textarea';

            // 空文字列の値はスキップ（Zoho SDKの検証エラーを回避）
            // ただし、複数行テキストフィールドの場合は空文字列でもスキップしない
            if ($value === '' && !$isTextarea) {
                continue;
            }

            // 配列が来た場合は multiselectpicklist のみ許可
            $isMultiArrayField = ($record->isPicklistField($apiName) && is_array($value))
                || $dataType === 'multiselectpicklist';
            if (is_array($value) && !$isMultiArrayField) {
                AcmsLogger::notice('【Zoho plugin】配列の値は multiselectpicklist フィールドにのみ使用できます。フィールドをスキップします。', [
                    'module' => $scope,
                    'apiName' => $apiName,
                    'value' => $value,
                    'dataType' => $dataType,
                ]);
                continue;
            }

            // ルックアップフィールドの判定（メタデータから取得した情報も考慮）
            $isLookup = $record->isLookupField($apiName) || $dataType === 'lookup';

            // ルックアップフィールドの場合、ZohoRecordオブジェクトに変換
            if ($isLookup) {
                if (empty($value)) {
                    continue;
                }
                // 値がレコードIDの形式（数値）かチェック
                if (!is_numeric($value)) {
                    AcmsLogger::warning('【Zoho plugin】ルックアップフィールドの値がレコードIDではありません。フィールドをスキップします。', [
                        'module' => $scope,
                        'apiName' => $apiName,
                        'value' => $value,
                        'message' => 'ルックアップフィールドにはレコードIDが必要です。resolveLookupFieldsが正しく実行されているか確認してください。'
                    ]);
                    continue;
                }
                $lookupRecord = new ZohoRecord();
                $lookupRecord->setId($value);
                $fieldValue = $lookupRecord;
            } elseif ($record->isPicklistField($apiName) || $dataType === 'picklist' || $dataType === 'multiselectpicklist') {
                // ピックリストフィールドはChoiceオブジェクトとして設定
                // multiselectpicklist は Choice オブジェクトの配列として送信
                if (is_array($value)) {
                    $fieldValue = array_map(fn($v) => new Choice($v), $value);
                } else {
                    $fieldValue = new Choice($value);
                }
            } elseif ($isTextarea) {
                // 複数行テキストフィールドは文字列として設定（改行を保持）
                // nullまたは空文字列の場合は空文字列にする
                $fieldValue = $value !== null ? (string)$value : '';
            } elseif ($record->isDateField($apiName) || $dataType === 'date') {
                // 日付フィールドの変換
                $fieldValue = $this->convertToDate($value);
                if ($fieldValue === null && $value !== '' && $value !== null) {
                    continue; // 変換失敗時はスキップ
                }
            } elseif ($record->isDatetimeField($apiName) || $dataType === 'datetime') {
                // 日時フィールドの変換
                $fieldValue = $this->convertToDateTime($value);
                if ($fieldValue === null && $value !== '' && $value !== null) {
                    continue; // 変換失敗時はスキップ
                }
            } elseif ($record->isNumberField($apiName) || in_array($dataType, ['integer', 'double', 'decimal', 'currency', 'bigint', 'number'], true)) {
                // 数値フィールドの変換
                $numberType = $record->getNumberFieldType($apiName) ?? $dataType;
                $fieldValue = $this->convertToNumber($value, $numberType);
                if ($fieldValue === null && $value !== '' && $value !== null) {
                    continue; // 変換失敗時はスキップ
                }
            } elseif ($record->isTimeField($apiName) || $dataType === 'time') {
                // 時刻フィールドのバリデーション（HH:MM 形式）
                $fieldValue = $this->validateTimeFormat($value);
                if ($fieldValue === null && $value !== '' && $value !== null) {
                    continue; // バリデーション失敗時はスキップ
                }
            } elseif ($dataType === 'multiselectlookup') {
                // 複数選択ルックアップフィールドは未対応
                AcmsLogger::notice('【Zoho plugin】multiselectlookup フィールドは対応していません。フィールドをスキップします。', [
                    'module' => $scope,
                    'apiName' => $apiName,
                ]);
                continue;
            } elseif ($record->isUserLookupField($apiName) || in_array($dataType, ['ownerlookup', 'userlookup'], true)) {
                // オーナー/ユーザールックアップ：ユーザーIDのZohoRecordとして送信
                if (empty($value)) {
                    continue;
                }
                if (!is_numeric($value)) {
                    AcmsLogger::warning('【Zoho plugin】オーナー/ユーザールックアップフィールドの値がユーザーIDではありません。フィールドをスキップします。', [
                        'module' => $scope,
                        'apiName' => $apiName,
                        'value' => $value,
                        'dataType' => $dataType,
                    ]);
                    continue;
                }
                $lookupRecord = new ZohoRecord();
                $lookupRecord->setId($value);
                $fieldValue = $lookupRecord;
            } else {
                $fieldValue = $value;
            }

            try {
                $field = new \com\zoho\crm\api\record\Field($apiName);
                $apiRecord->addFieldValue($field, $fieldValue);
            } catch (\Exception $e) {
                // フィールドがモジュールに存在しない場合などのエラーをログに記録してスキップ
                AcmsLogger::error('【Zoho plugin】フィールドの追加に失敗しました。', [
                    'module' => $scope,
                    'apiName' => $apiName,
                    'value' => is_string($value) && mb_strlen($value) > 100 ? mb_substr($value, 0, 100) . '...' : $value,
                    'valueType' => gettype($value),
                    'dataType' => $dataType,
                    'isTextarea' => $isTextarea,
                    'isPicklist' => $record->isPicklistField($apiName),
                    'isLookup' => $isLookup,
                    'fieldValueType' => is_object($fieldValue) ? get_class($fieldValue) : gettype($fieldValue),
                    'error' => $e->getMessage(),
                    'exceptionClass' => get_class($e)
                ]);
                continue;
            }
        }

        return $apiRecord;
    }

    /**
     * 値を日付（DateTime）に変換
     *
     * @param mixed $value 変換する値
     * @return DateTime|null 変換されたDateTime、または空/失敗時はnull
     */
    private function convertToDate($value): ?DateTime
    {
        if ($value === '' || $value === null) {
            return null;
        }

        // 既にDateTimeの場合は時刻を00:00:00にリセット
        if ($value instanceof DateTime) {
            $value->setTime(0, 0, 0);
            return $value;
        }

        // 文字列の場合は明示的なフォーマットでDateTimeに変換
        // a-blog CMSからは "Y-m-d" 形式で送信される
        $date = DateTime::createFromFormat('Y-m-d', $value);
        if ($date !== false) {
            $date->setTime(0, 0, 0);
            return $date;
        }

        // スラッシュ区切りの日付形式（例: "2026/02/26"）にも対応
        $date = DateTime::createFromFormat('Y/m/d', $value);
        if ($date !== false) {
            $date->setTime(0, 0, 0);
            return $date;
        }

        // 上記フォーマットで失敗した場合はPHPのDateTimeパーサーで試みる
        try {
            $date = new DateTime($value);
            $date->setTime(0, 0, 0);
            return $date;
        } catch (\Exception $e) {
            // パース失敗時は下のwarningへ
        }

        AcmsLogger::warning('【Zoho plugin】日付の変換に失敗しました。', [
            'value' => $value,
            'expectedFormat' => 'Y-m-d'
        ]);
        return null;
    }

    /**
     * 値を日時（DateTime）に変換
     *
     * @param mixed $value 変換する値
     * @return DateTime|null 変換されたDateTime、または空/失敗時はnull
     */
    private function convertToDateTime($value): ?DateTime
    {
        if ($value === '' || $value === null) {
            return null;
        }
        if ($value instanceof DateTime) {
            return $value;
        }

        // 文字列の場合は明示的なフォーマットでDateTimeに変換
        // a-blog CMSからは "Y-m-d H:i:s" 形式で送信される
        $datetime = DateTime::createFromFormat('Y-m-d H:i:s', $value);
        if ($datetime !== false) {
            return $datetime;
        }

        // "Y-m-d" のみの場合も許容（時刻は00:00:00になる）
        $datetime = DateTime::createFromFormat('Y-m-d', $value);
        if ($datetime !== false) {
            $datetime->setTime(0, 0, 0);
            return $datetime;
        }

        // スラッシュ区切り + ISO 8601風（例: "2026/02/26T09:00:00+09:00"）にも対応
        $datetime = DateTime::createFromFormat('Y/m/d\TH:i:sP', $value);
        if ($datetime !== false) {
            return $datetime;
        }

        // 上記フォーマットで失敗した場合はPHPのDateTimeパーサーで試みる
        try {
            $datetime = new DateTime($value);
            return $datetime;
        } catch (\Exception $e) {
            // パース失敗時は下のwarningへ
        }

        AcmsLogger::warning('【Zoho plugin】日時の変換に失敗しました。', [
            'value' => $value,
            'expectedFormat' => 'Y-m-d H:i:s'
        ]);
        return null;
    }

    /**
     * 時刻文字列をバリデーション（HH:MM 形式）
     *
     * @param mixed $value 検証する値
     * @return string|null HH:MM 形式の文字列、またはバリデーション失敗時はnull
     */
    private function validateTimeFormat($value): ?string
    {
        if ($value === '' || $value === null) {
            return null;
        }

        $value = (string)$value;

        // HH:MM または HH:MM:SS 形式を許容
        if (preg_match('/^\d{2}:\d{2}(:\d{2})?$/', $value)) {
            // HH:MM:SS の場合は HH:MM に切り詰める
            return substr($value, 0, 5);
        }

        AcmsLogger::warning('【Zoho plugin】時刻の形式が不正です。', [
            'value' => $value,
            'expectedFormat' => 'HH:MM'
        ]);
        return null;
    }

    /**
     * 値を数値（int/float）に変換
     *
     * @param mixed $value 変換する値
     * @param string|null $numberType 数値タイプ (integer, double, decimal, currency, bigint, number)
     * @return int|float|null 変換された数値、または空/失敗時はnull
     */
    private function convertToNumber($value, ?string $numberType)
    {
        if ($value === '' || $value === null) {
            return null;
        }

        if (is_int($value) || is_float($value)) {
            if ($numberType === 'integer' || $numberType === 'bigint') {
                return (int)$value;
            }
            return (float)$value;
        }

        if (is_string($value)) {
            // カンマを除去（通貨フォーマット対応）
            $cleanValue = str_replace(',', '', $value);

            // 通貨記号を除去（Unicodeカテゴリで全通貨記号に対応）
            $cleanValue = preg_replace('/\p{Sc}/u', '', $cleanValue);
            $cleanValue = trim($cleanValue);

            if (!is_numeric($cleanValue)) {
                AcmsLogger::warning('【Zoho plugin】数値の変換に失敗しました。', [
                    'value' => $value,
                    'cleanValue' => $cleanValue,
                    'numberType' => $numberType
                ]);
                return null;
            }

            if ($numberType === 'integer' || $numberType === 'bigint') {
                return (int)$cleanValue;
            }
            return (float)$cleanValue;
        }

        return null;
    }
}
