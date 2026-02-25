<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Services\Facades\Cache;
use com\zoho\crm\api\HeaderMap;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\fields\ResponseWrapper as FieldsResponseWrapper;
use com\zoho\crm\api\fields\FieldsOperations;
use com\zoho\crm\api\fields\APIException;
use com\zoho\crm\api\fields\GetFieldsParam;

class FieldApi extends ApiBase
{
    /**
     * モジュールフィールド情報を取得する
     *
     * @param string $moduleApiName モジュールAPI名
     * @return array フィールド情報の配列
     */
    public function getModuleFields(string $moduleApiName): array
    {
        try {
            $cache = Cache::module();
            $cacheKey = 'zoho-module-fields-' . $moduleApiName;

            if ($cache->has($cacheKey)) {
                return $cache->get($cacheKey);
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】キャッシュの取得に失敗しました。APIから取得します。', [
                'module' => $moduleApiName,
                'message' => $e->getMessage(),
            ]);
            $cache = null;
            $cacheKey = null;
        }

        try {
            $fieldsOperations = new FieldsOperations();
            $paramInstance = new ParameterMap();
            $paramInstance->add(GetFieldsParam::module(), $moduleApiName);
            $headerInstance = new HeaderMap();
            $response = $fieldsOperations->getFields($paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof FieldsResponseWrapper) {
                    $fields = $responseHandler->getFields();
                    $result = [];

                    foreach ($fields as $field) {
                        $dataType = $field->getDataType();

                        // dataTypeの値を取得（オブジェクトまたは文字列の可能性がある）
                        $dataTypeValue = null;
                        if ($dataType) {
                            if (is_object($dataType) && method_exists($dataType, 'getValue')) {
                                $dataTypeValue = $dataType->getValue();
                            } else if (is_string($dataType)) {
                                $dataTypeValue = $dataType;
                            }
                        }

                        $fieldData = [
                            'api_name' => $field->getAPIName(),
                            'field_label' => $field->getFieldLabel(),
                            'data_type' => $dataTypeValue,
                        ];

                        $result[] = $fieldData;
                    }

                    // キャッシュに保存
                    if ($cache !== null && $cacheKey !== null) {
                        try {
                            $cache->put($cacheKey, $result, ZohoApi::cacheLifetime());
                            $this->registerCacheKey($cache, $cacheKey);
                        } catch (\Exception $e) {
                            AcmsLogger::warning('【Zoho plugin】キャッシュの保存に失敗しました。', [
                                'module' => $moduleApiName,
                                'message' => $e->getMessage(),
                            ]);
                        }
                    }

                    return $result;
                } elseif ($responseHandler instanceof APIException) {
                    AcmsLogger::warning('【Zoho plugin】モジュールフィールドの取得でAPIエラーが発生しました。', [
                        'module' => $moduleApiName,
                        'message' => $responseHandler->getMessage(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】モジュールフィールドの取得で例外が発生しました。', [
                'module' => $moduleApiName,
                'message' => $e->getMessage(),
            ]);
        }

        return [];
    }

    /**
     * 特定のフィールド情報を取得する
     *
     * @param string $moduleApiName モジュールAPI名
     * @param string $fieldApiName フィールドAPI名
     * @return array|null フィールド情報、失敗時はnull
     */
    public function getField(string $moduleApiName, string $fieldApiName): ?array
    {
        try {
            $fieldsOperations = new FieldsOperations($moduleApiName);
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();
            $response = $fieldsOperations->getField($fieldApiName, $paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof FieldsResponseWrapper) {
                    $fields = $responseHandler->getFields();

                    if (!empty($fields)) {
                        $field = $fields[0];
                        $fieldData = [
                            'api_name' => $field->getAPIName(),
                            'field_label' => $field->getFieldLabel(),
                            'data_type' => $field->getDataType(),
                            'length' => $field->getLength(),
                            'required' => $field->getRequired(),
                            'unique' => $field->getUnique(),
                            'read_only' => $field->getReadOnly(),
                            'custom_field' => $field->getCustomField(),
                            'default_value' => $field->getDefaultValue(),
                            'sequence_number' => $field->getSequenceNumber(),
                            'id' => $field->getId(),
                            'tooltip' => $field->getTooltip(),
                            'created_source' => $field->getCreatedSource(),
                            'field_read_only' => $field->getFieldReadOnly(),
                            'display_label' => $field->getDisplayLabel(),
                            'validation_rule' => $field->getValidationRule(),
                            'convert_mapping' => $field->getConvertMapping(),
                        ];

                        // 選択肢フィールドの場合
                        $pickListValues = $field->getPickListValues();
                        if (!empty($pickListValues)) {
                            $fieldData['pick_list_values'] = [];
                            foreach ($pickListValues as $pickListValue) {
                                $fieldData['pick_list_values'][] = [
                                    'display_value' => $pickListValue->getDisplayValue(),
                                    'actual_value' => $pickListValue->getActualValue(),
                                    'sequence_number' => $pickListValue->getSequenceNumber(),
                                    'maps' => $pickListValue->getMaps(),
                                ];
                            }
                        }

                        return $fieldData;
                    }
                } elseif ($responseHandler instanceof APIException) {
                    AcmsLogger::warning('【Zoho plugin】フィールド情報の取得でAPIエラーが発生しました。', [
                        'module' => $moduleApiName,
                        'field' => $fieldApiName,
                        'message' => $responseHandler->getMessage(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】フィールド情報の取得で例外が発生しました。', [
                'module' => $moduleApiName,
                'field' => $fieldApiName,
                'message' => $e->getMessage(),
            ]);
        }

        return null;
    }

    /**
     * ラベル名からAPI名への変換マップを生成する
     *
     * @param string $moduleApiName モジュールAPI名
     * @return array ラベル名 => API名 のマップ
     */
    public function createLabelToApiNameMap(string $moduleApiName): array
    {
        $fields = $this->getModuleFields($moduleApiName);
        $map = [];

        foreach ($fields as $field) {
            $fieldLabel = $field['field_label'];
            $apiName = $field['api_name'];

            if (!empty($fieldLabel) && !empty($apiName)) {
                $map[$fieldLabel] = $apiName;
            }
        }

        return $map;
    }

    /**
     * 複数モジュールのラベル名からAPI名への変換マップを生成する
     *
     * @param array $moduleApiNames モジュールAPI名の配列
     * @return array モジュール別のマップ情報
     */
    public function createMultiModuleLabelToApiNameMap(array $moduleApiNames): array
    {
        $result = [];

        foreach ($moduleApiNames as $moduleApiName) {
            $map = $this->createLabelToApiNameMap($moduleApiName);
            if (!empty($map)) {
                $result[] = [
                    'moduleName' => $moduleApiName,
                    'map' => $map
                ];
            }
        }

        return $result;
    }

    /**
     * キャッシュキーを一覧に登録（クリア時に使用）
     *
     * @param \Acms\Services\Cache\Contracts\AdapterInterface $cache
     * @param string $cacheKey
     * @return void
     */
    private function registerCacheKey($cache, string $cacheKey): void
    {
        $registryKey = 'zoho-cached-field-keys';
        $keys = $cache->get($registryKey) ?: [];
        if (!in_array($cacheKey, $keys, true)) {
            $keys[] = $cacheKey;
            $cache->put($registryKey, $keys, 0);
        }
    }
}
