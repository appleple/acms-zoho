<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Mapper;

use Field as ACMSField;
use Acms\Plugins\Zoho\Services\Zoho\Mapper;

class ModuleField extends Mapper
{
    /** @var array<int, mixed> Zohoから取得したフィールドのリスト */
    public $fields;

    /** @var ACMSField FormIDの拡張アプリ設定 */
    public $config;

    /**
     * コンストラクタ
     *
     * @param array<int, mixed> $fields
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
     * @return array<int, array<string, mixed>> フィールド情報の配列
     */
    public function toArray()
    {
        if ($this->fields === [] || !is_array($this->fields)) {
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
            if (isset($field['unique'])) {
                $fieldData['unique'] = $field['unique'];
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
        if ($this->fields === [] || !is_array($this->fields)) {
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
     * @return array<int, array<string, mixed>> 必須フィールドの配列
     */
    public function getRequiredFields(): array
    {
        if ($this->fields === [] || !is_array($this->fields)) {
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
