<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Models;

use com\zoho\crm\api\record\Record as ZohoRecord;

/**
 * Zoho CRMへ送信する1レコード分のデータを表現するモデルクラス
 *
 * - モジュール名（Leads, Contacts等）
 * - 操作タイプ（insert/update）
 * - フィールドデータ
 * - ユニークキー（upsert判定用）
 * を保持する
 *
 * 実際のマッピング処理は Mapper\Record クラスで行われる
 */
class Record
{
    /** @var string|null ID */
    private $id;

    /** @var string モジュールAPI名 */
    private $moduleApiName;

    /**
     * Upsert時の重複チェックに使用するフィールド名
     * 例: "Email" など
     * 空の場合は単純なinsert/updateとして扱われる
     *
     * @var string
     */
    private $uniqueKey;

    /**
     * Zohoのレコードモデル形式で配列で管理
     * @var ZohoRecord[]
     */
    private $fields = [];

    /**
     * @var string insert|update|pending
     * zoho_form_insert_scopeまたはzoho_form_update_scopeで判断
     * */
    private $type;

    /** @var int|null フォームグループのインデックス（優先順位処理用） */
    public $groupIndex;

    /** @var mixed 比較フィールドの値（リレーション処理用） */
    public $compareFieldValue;

    /** @var array ルックアップフィールドのリスト [フィールド名 => true] */
    private $lookupFields = [];

    /** @var array ピックリストフィールドのリスト [フィールド名 => true] */
    private $picklistFields = [];

    /** @var array 複数行テキストフィールドのリスト [フィールド名 => true] */
    private $textareaFields = [];

    /**
     * @param string $moduleApiName モジュールAPI名
     * @param string $type insert|update|pending
     * @param string $uniqueKey
     */
    public function __construct(string $moduleApiName, string $type, string $uniqueKey = '')
    {
        $this->moduleApiName = $moduleApiName;
        $this->type = $type;
        $this->uniqueKey = $uniqueKey;
    }

    /**
     * @return string ex) Leads, Contacts
     */
    public function getModuleApiName(): string
    {
        return $this->moduleApiName;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * 一意キーを取得
     *
     * @return string
     */
    public function getUniqueKey(): string
    {
        return $this->uniqueKey;
    }

    /**
     * @param string|null $id
     * @return self
     */
    public function setId(?string $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * フィールドを追加
     *
     * @param string $key フィールド名
     * @param mixed $value フィールド値
     * @return self
     */
    public function addField(string $key, $value)
    {
        $this->fields[$key] = $value;
        return $this;
    }

    /**
     * 複数のフィールドを一括追加
     *
     * @param array $fields フィールドの配列
     * @return self
     */
    public function addFields(array $fields)
    {
        foreach ($fields as $key => $value) {
            $this->addField($key, $value);
        }
        return $this;
    }

    /**
     * 全フィールドを取得
     *
     * @return array
     */
    public function getFields(): array
    {
        return $this->fields;
    }

    /**
     * 指定したフィールドが存在するか確認
     *
     * @param string $key フィールド名
     * @return bool
     */
    public function hasField(string $key): bool
    {
        return isset($this->fields[$key]);
    }

    /**
     * 指定したフィールドの値を取得
     *
     * @param string $key フィールド名
     * @param mixed $default デフォルト値
     * @return mixed
     */
    public function getField(string $key, $default = null)
    {
        return $this->hasField($key) ? $this->fields[$key] : $default;
    }

    /**
     * 指定したフィールドを削除
     *
     * @param string $key フィールド名
     * @return self
     */
    public function removeField(string $key)
    {
        unset($this->fields[$key]);
        return $this;
    }

    /**
     * フィールドをルックアップとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsLookupField(string $fieldName)
    {
        $this->lookupFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドがルックアップかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isLookupField(string $fieldName): bool
    {
        return isset($this->lookupFields[$fieldName]);
    }

    /**
     * フィールドをピックリストとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsPicklistField(string $fieldName)
    {
        $this->picklistFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドがピックリストかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isPicklistField(string $fieldName): bool
    {
        return isset($this->picklistFields[$fieldName]);
    }

    /**
     * フィールドを複数行テキストとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsTextareaField(string $fieldName)
    {
        $this->textareaFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドが複数行テキストかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isTextareaField(string $fieldName): bool
    {
        return isset($this->textareaFields[$fieldName]);
    }

    /**
     * 配列からレコードオブジェクトを生成
     *
     * @param array $data
     * @return self
     */
    public static function fromArray(array $data): self
    {
        $moduleApiName = $data['moduleApiName'] ?? $data['scope'] ?? ''; // 後方互換性のためscopeも確認
        $record = new self($moduleApiName, $data['type'], $data['uniqueKey'] ?? '');

        if (isset($data['field']) && is_array($data['field'])) {
            $record->addFields($data['field']);
        }

        if (isset($data['id'])) {
            $record->setId($data['id']);
        }

        return $record;
    }
}
