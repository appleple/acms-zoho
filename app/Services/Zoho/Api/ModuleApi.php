<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;

use com\zoho\crm\api\HeaderMap;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\modules\ModulesOperations;
use com\zoho\crm\api\modules\ResponseWrapper;
use com\zoho\crm\api\modules\APIException;

class ModuleApi extends ApiBase
{
    /**
     * モジュール一覧を取得する
     *
     * @param bool $includeFields フィールド情報も含めるかどうか
     * @return array モジュール情報の配列
     */
    public function getModules(bool $includeFields = false): array
    {
        try {
            $moduleOperations = new ModulesOperations();
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();
            $response = $moduleOperations->getModules($paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $modules = $responseHandler->getModules();

                    // 元のZohoモジュールオブジェクトをそのまま返す
                    return $modules;
                } else if ($responseHandler instanceof APIException) {
                    AcmsLogger::info('Zoho API Exception in getModules: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in getModules: ' . $e->getMessage());
        }

        return [];
    }

    /**
     * 指定されたモジュールの詳細情報を取得する
     *
     * @param string $moduleApiName モジュールAPI名
     * @return object|null Zohoモジュールオブジェクト、失敗時はnull
     */
    public function getModule(string $moduleApiName)
    {
        try {
            $moduleOperations = new ModulesOperations();
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();
            $response = $moduleOperations->getModule($moduleApiName, $paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $modules = $responseHandler->getModules();

                    if (!empty($modules)) {
                        // 元のZohoモジュールオブジェクトをそのまま返す
                        return $modules[0];
                    }
                } else if ($responseHandler instanceof APIException) {
                    AcmsLogger::info('Zoho API Exception in getModule: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in getModule: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * モジュールフィールド情報を取得する
     *
     * @param string $moduleApiName モジュールAPI名
     * @return array フィールド情報の配列
     */
    private function getModuleFields(string $moduleApiName): array
    {
        try {
            $fieldsOperations = new \com\zoho\crm\api\fields\FieldsOperations();
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();
            $response = $fieldsOperations->getFields($moduleApiName, $paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof \com\zoho\crm\api\fields\ResponseWrapper) {
                    $fields = $responseHandler->getFields();
                    $result = [];

                    foreach ($fields as $field) {
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

                        $result[] = $fieldData;
                    }

                    return $result;
                } else if ($responseHandler instanceof \com\zoho\crm\api\fields\APIException) {
                    AcmsLogger::info('Zoho API Exception in getModuleFields: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in getModuleFields: ' . $e->getMessage());
        }

        return [];
    }
}