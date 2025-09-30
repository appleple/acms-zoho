<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;
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
                        $fieldData = [
                            'api_name' => $field->getAPIName(),
                            'field_label' => $field->getFieldLabel(),
                            // 'data_type' => $field->getDataType(),
                            // 'length' => $field->getLength(),
                            // 'required' => $field->getRequired(),
                            // 'unique' => $field->getUnique(),
                            // 'read_only' => $field->getReadOnly(),
                            // 'custom_field' => $field->getCustomField(),
                            // 'default_value' => $field->getDefaultValue(),
                            // 'sequence_number' => $field->getSequenceNumber(),
                            // 'id' => $field->getId(),
                            // 'tooltip' => $field->getTooltip(),
                            // 'created_source' => $field->getCreatedSource(),
                            // 'field_read_only' => $field->getFieldReadOnly(),
                            // 'display_label' => $field->getDisplayLabel(),
                            // 'validation_rule' => $field->getValidationRule(),
                            // 'convert_mapping' => $field->getConvertMapping(),
                        ];

                        // 選択肢フィールドの場合
                        // $pickListValues = $field->getPickListValues();
                        // if (!empty($pickListValues)) {
                        //     $fieldData['pick_list_values'] = [];
                        //     foreach ($pickListValues as $pickListValue) {
                        //         $fieldData['pick_list_values'][] = [
                        //             'display_value' => $pickListValue->getDisplayValue(),
                        //             'actual_value' => $pickListValue->getActualValue(),
                        //             'sequence_number' => $pickListValue->getSequenceNumber(),
                        //             'maps' => $pickListValue->getMaps(),
                        //         ];
                        //     }
                        // }

                        // ルックアップフィールドの場合
                        // $lookup = $field->getLookup();
                        // if ($lookup != null) {
                        //     $fieldData['lookup'] = [
                        //         'display_label' => $lookup->getDisplayLabel(),
                        //         'api_name' => $lookup->getAPIName(),
                        //         'module' => $lookup->getModule(),
                        //         'id' => $lookup->getId(),
                        //     ];
                        // }

                        // 数式フィールドの場合
                        // $formula = $field->getFormula();
                        // if ($formula != null) {
                        //     $fieldData['formula'] = [
                        //         'return_type' => $formula->getReturnType(),
                        //         'expression' => $formula->getExpression(),
                        //     ];
                        // }

                        // 通貨フィールドの場合
                        // $currency = $field->getCurrency();
                        // if ($currency != null) {
                        //     $fieldData['currency'] = [
                        //         'rounding_option' => $currency->getRoundingOption(),
                        //         'precision' => $currency->getPrecision(),
                        //     ];
                        // }

                        $result[] = $fieldData;
                    }

                    return $result;
                } elseif ($responseHandler instanceof APIException) {
                    AcmsLogger::warning('Zoho API Exception in getModuleFields: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('Exception in getModuleFields: ' . $e->getMessage());
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
                    AcmsLogger::info('Zoho API Exception in getField: ' . $responseHandler->getMessage());
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::info('Exception in getField: ' . $e->getMessage());
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
}
