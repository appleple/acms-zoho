<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Mapper;

use Field as ACMSField;
use Acms\Plugins\Zoho\Services\Zoho\Mapper;

class ModuleField extends Mapper
{
    /** @var array Zohoから取得したフィールドのリスト */
    public $fields;

    /** @var ACMSField FormIDの拡張アプリ設定 */
    public $config;

    /**
     * コンストラクタ
     *
     * @param array $fields
     * @param ACMSField $config
     */
    public function __construct(array $fields, ACMSField $config)
    {
        $this->fields = $fields;
        $this->config = $config;
    }

    /**
     * フィールドをフロントエンド用の形式に変換する
     *
     * @return array フィールド情報の配列
     */
    public function toArray()
    {
        if (empty($this->fields) || !is_array($this->fields)) {
            return [];
        }

        $result = [];
        foreach ($this->fields as $field) {
            if (!is_array($field)) {
                continue;
            }

            $fieldData = [
                'apiName' => $field['api_name'] ?? '',
                'fieldName' => $field['field_label'] ?? '',
            ];

            // 追加のフィールド情報も含める場合
            if (isset($field['data_type'])) {
                $fieldData['dataType'] = $field['data_type'];
            }
            if (isset($field['required'])) {
                $fieldData['required'] = $field['required'];
            }
            if (isset($field['read_only'])) {
                $fieldData['readOnly'] = $field['read_only'];
            }

            $result[] = $fieldData;
        }

        return $result;
    }

    /**
     * 指定されたAPI名のフィールドが存在するかどうか
     *
     * @param string $apiName
     * @return bool
     */
    public function isFieldExists(string $apiName): bool
    {
        if (empty($this->fields) || !is_array($this->fields)) {
            return false;
        }

        foreach ($this->fields as $field) {
            if (is_array($field) && isset($field['api_name']) && $field['api_name'] === $apiName) {
                return true;
            }
        }

        return false;
    }

    /**
     * 必須フィールドのみを取得
     *
     * @return array 必須フィールドの配列
     */
    public function getRequiredFields(): array
    {
        if (empty($this->fields) || !is_array($this->fields)) {
            return [];
        }

        $result = [];
        foreach ($this->fields as $field) {
            if (is_array($field) && isset($field['required']) && $field['required'] === true) {
                $result[] = [
                    'apiName' => $field['api_name'] ?? '',
                    'fieldName' => $field['field_label'] ?? '',
                ];
            }
        }

        return $result;
    }
}