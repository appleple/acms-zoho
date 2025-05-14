<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Mapper;

use Field;
use Acms\Plugins\Zoho\Services\Zoho\Mapper;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record as RecordModel;

/**
 * Recordオブジェクトのマッパー
 * a-blog cms と Zoho のフィールドをマッピングやデータ整形するためのクラス
 */
class Record extends Mapper
{
    /** @var Field */
    private $config;

    /** @var Field */
    private $field;

    /**
     * コンストラクタ
     *
     * @param Field $field フォームフィールド
     * @param Field $config FormIDの拡張アプリ設定
     */
    public function __construct(Field $field, Field $config)
    {
        $this->field = $field;
        $this->config = $config;
    }

    /**
     * フォーム設定からZohoレコード構造を作成
     *
     * @return RecordModel[]
     */
    public function makeRecords()
    {
        $zohoScopeGroup = $this->config->getArray('zoho_form_group_index');
        $records = [];

        foreach ($zohoScopeGroup as $i => $zohoScopeItem) {
            $insertScopes = [];
            $updateScopes = [];
            $zohoInsertScope = $this->config->get('zoho_form_insert_scope', '', $i);
            $zohoUpdateScope = $this->config->get('zoho_form_update_scope', '', $i);
            $uniqueKey = $this->config->get('zoho_form_unique_key', '', $i);

            if ($zohoInsertScope) {
                $insertScopes = explode(',', $zohoInsertScope);
            }
            if ($zohoUpdateScope) {
                $updateScopes = explode(',', $zohoUpdateScope);
            }
            if (!$uniqueKey) {
                $uniqueKey = 'メール';
            }

            foreach ($insertScopes as $insertScope) {
                $records[] = new RecordModel(
                    $insertScope,
                    'insert',
                    array_search($insertScope, $updateScopes) !== false ? $uniqueKey : ''
                );
            }

            foreach ($updateScopes as $updateScope) {
                $records[] = new RecordModel(
                    $updateScope,
                    'update',
                    $uniqueKey
                );
            }
        }

        return $records;
    }

    /**
     * レコードにフィールドデータを追加
     *
     * @param RecordModel[] $records
     * @return RecordModel[]
     */
    public function addFieldsToRecords(array $records)
    {
        $attachedRecords = [];

        foreach ($records as $record) {
            $groupArr = $this->getGroupArray($record);
            $length = $groupArr ? $this->getMaxKey($groupArr) : 1;

            for ($cnt = 0; $cnt < $length; $cnt++) {
                $mappedFields = $this->mapFields($record, $groupArr, $cnt);

                // 新しいレコードを作成してフィールドをコピー
                $newRecord = new RecordModel(
                    $record->getScope(),
                    $record->getType(),
                    $record->getUniqueKey()
                );

                $newRecord->addFields($mappedFields);

                if ($record->getId()) {
                    $newRecord->setId($record->getId());
                }

                $attachedRecords[] = $newRecord;
            }
        }

        return $attachedRecords;
    }

    /**
     * フィールドマッピングを行う
     *
     * @param RecordModel $record
     * @param array|null $groupArr
     * @param int $index
     * @return array
     */
    private function mapFields(RecordModel $record, ?array $groupArr, int $index)
    {
        $scope = $record->getScope();
        $type = $record->getType();
        $fieldKeys = $this->config->getArray('zoho_field_key');
        $item = [];

        foreach ($fieldKeys as $i => $fieldKey) {
            $key = $this->config->get('zoho_field_cms_key', '', $i);
            $scopes = explode(',', $this->config->get('zoho_field_scope', '', $i));
            $canInsert = $this->config->get('zoho_field_insert', '', $i);
            $canUpdate = $this->config->get('zoho_field_update', '', $i);

            foreach ($scopes as $currentScope) {
                if ($scope === $currentScope) {
                    if (($type === 'insert' && $canInsert) || ($type === 'update' && $canUpdate)) {
                        $value = $this->getFieldValue($key, $groupArr, $index);
                        $item[$fieldKey] = $this->normalizeValue($value);
                    }
                }
            }
        }

        return $item;
    }

    /**
     * フィールド値を取得
     *
     * @param string $key
     * @param array|null $groupArr
     * @param int $index
     * @return mixed
     */
    private function getFieldValue(string $key, ?array $groupArr, int $index)
    {
        if ($groupArr && in_array($key, $groupArr)) {
            return $this->field->get($key, '', $index);
        } else {
            return implode("-", $this->field->getArray($key));
        }
    }

    /**
     * 値を適切な型に変換
     *
     * @param mixed $value
     * @return mixed
     */
    private function normalizeValue($value)
    {
        if ($value === 'true') {
            return true;
        } elseif ($value === 'false') {
            return false;
        }
        return $value;
    }

    /**
     * グループ配列を取得
     *
     * @param RecordModel $record
     * @return array|null
     */
    public function getGroupArray(RecordModel $record)
    {
        $zohoScope = $record->getScope();
        $type = $record->getType();
        $keys = $this->config->getArray('zoho_field_cms_key');

        foreach ($keys as $i => $key) {
            $scopes = $this->config->get('zoho_field_scope', '', $i);
            $insert = $this->config->get('zoho_field_insert', '', $i);
            $update = $this->config->get('zoho_field_update', '', $i);

            if ($type === 'insert' && !$insert) {
                continue;
            }
            if ($type === 'update' && !$update) {
                continue;
            }

            $scopes = explode(',', $scopes);
            foreach ($scopes as $scope) {
                if ($scope === $zohoScope) {
                    if (isset($key) && isset($key[0]) && $key[0] === '@') {
                        return $this->field->getArray($key);
                    }
                }
            }
        }

        return null;
    }

    /**
     * 配列内の最大インデックスを取得
     *
     * @param array $keys
     * @return int
     */
    private function getMaxKey(array $keys)
    {
        $max = 1;
        foreach ($keys as $key) {
            $arr = $this->field->getArray($key);
            $cnt = count($arr);
            if ($cnt > $max) {
                $max = $cnt;
            }
        }
        return $max;
    }

    /**
     * タイプでレコードをフィルタリング
     *
     * @param RecordModel[] $records
     * @param string $type
     * @return RecordModel[]
     */
    public function getRecordsByType(array $records, string $type)
    {
        return array_values(array_filter($records, function (RecordModel $record) use ($type) {
            return $record->getType() === $type;
        }));
    }

    /**
     * 配列データからレコード配列を作成
     *
     * @param array $fieldRecords
     * @return array
     */
    public function arrayCheck(array $fieldRecords)
    {
        $records = [];

        foreach ($fieldRecords as $j => $fieldRecord) {
            $count = $this->getRecordLength($fieldRecord);

            for ($i = 0; $i <= $count - 1; $i++) {
                $record = array_merge([], $fieldRecords[$j]);

                foreach ($fieldRecord as $label => $value) {
                    if ($label) {
                        $items = explode(';', $value);
                        if (count($items) > 1) {
                            $record[$label] = $items[$i];
                        } else {
                            $record[$label] = $value;
                        }
                    }
                }

                $records[] = $record;
            }
        }

        return $records;
    }

    /**
     * レコードの長さを取得
     *
     * @param array $field
     * @return int
     */
    private function getRecordLength(array $field)
    {
        $count = 0;
        foreach ($field as $label => $value) {
            $arr = explode(';', $value);
            if ($count < count($arr)) {
                $count = count($arr);
            }
        }
        return $count;
    }
}
