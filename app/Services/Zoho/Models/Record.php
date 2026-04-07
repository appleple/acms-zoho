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

    /** @var array 日付フィールドのリスト [フィールド名 => true] */
    private $dateFields = [];

    /** @var array 日時フィールドのリスト [フィールド名 => true] */
    private $datetimeFields = [];

    /** @var array 数値フィールドのリスト [フィールド名 => データタイプ] */
    private $numberFields = [];

    /** @var array 時刻フィールドのリスト [フィールド名 => true] */
    private $timeFields = [];

    /** @var array 複数選択ルックアップフィールドのリスト [フィールド名 => true] */
    private $multiselectlookupFields = [];

    /** @var array オーナー/ユーザールックアップフィールドのリスト [フィールド名 => true] */
    private $userLookupFields = [];

    /** @var string|null メモのタイトル */
    private $noteTitle;

    /** @var string|null メモの本文 */
    private $noteContent;

    /** @var string[] タグのリスト */
    private $tags = [];

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
     * @param string $moduleApiName モジュールAPI名
     * @return self
     */
    public function setModuleApiName(string $moduleApiName): self
    {
        $this->moduleApiName = $moduleApiName;
        return $this;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type insert|update|pending
     * @return self
     */
    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
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
     * フィールドを日付フィールドとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsDateField(string $fieldName)
    {
        $this->dateFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドが日付フィールドかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isDateField(string $fieldName): bool
    {
        return isset($this->dateFields[$fieldName]);
    }

    /**
     * フィールドを日時フィールドとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsDatetimeField(string $fieldName)
    {
        $this->datetimeFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドが日時フィールドかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isDatetimeField(string $fieldName): bool
    {
        return isset($this->datetimeFields[$fieldName]);
    }

    /**
     * フィールドを数値フィールドとしてマーク
     *
     * @param string $fieldName フィールド名
     * @param string $numberType 数値タイプ (integer, double, decimal, currency, bigint, number)
     * @return self
     */
    public function markAsNumberField(string $fieldName, string $numberType = 'double')
    {
        $this->numberFields[$fieldName] = $numberType;
        return $this;
    }

    /**
     * 指定フィールドが数値フィールドかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isNumberField(string $fieldName): bool
    {
        return isset($this->numberFields[$fieldName]);
    }

    /**
     * 数値フィールドのタイプを取得
     *
     * @param string $fieldName フィールド名
     * @return string|null 数値タイプ またはnull
     */
    public function getNumberFieldType(string $fieldName): ?string
    {
        return $this->numberFields[$fieldName] ?? null;
    }

    /**
     * フィールドを時刻フィールドとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsTimeField(string $fieldName)
    {
        $this->timeFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドが時刻フィールドかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isTimeField(string $fieldName): bool
    {
        return isset($this->timeFields[$fieldName]);
    }

    /**
     * フィールドを複数選択ルックアップフィールドとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsMultiselectlookupField(string $fieldName)
    {
        $this->multiselectlookupFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドが複数選択ルックアップフィールドかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isMultiselectlookupField(string $fieldName): bool
    {
        return isset($this->multiselectlookupFields[$fieldName]);
    }

    /**
     * フィールドをオーナー/ユーザールックアップフィールドとしてマーク
     *
     * @param string $fieldName フィールド名
     * @return self
     */
    public function markAsUserLookupField(string $fieldName)
    {
        $this->userLookupFields[$fieldName] = true;
        return $this;
    }

    /**
     * 指定フィールドがオーナー/ユーザールックアップフィールドかどうか判定
     *
     * @param string $fieldName フィールド名
     * @return bool
     */
    public function isUserLookupField(string $fieldName): bool
    {
        return isset($this->userLookupFields[$fieldName]);
    }

    /**
     * メモのタイトルを設定
     *
     * @param string|null $noteTitle メモのタイトル
     * @return self
     */
    public function setNoteTitle(?string $noteTitle): self
    {
        $this->noteTitle = $noteTitle;
        return $this;
    }

    /**
     * メモのタイトルを取得
     *
     * @return string|null
     */
    public function getNoteTitle(): ?string
    {
        return $this->noteTitle;
    }

    /**
     * メモの本文を設定
     *
     * @param string|null $noteContent メモの本文
     * @return self
     */
    public function setNoteContent(?string $noteContent): self
    {
        $this->noteContent = $noteContent;
        return $this;
    }

    /**
     * メモの本文を取得
     *
     * @return string|null
     */
    public function getNoteContent(): ?string
    {
        return $this->noteContent;
    }

    /**
     * メモが設定されているかどうか判定
     * Note_Contentが非空であればtrue（Note_Titleは任意）
     *
     * @return bool
     */
    public function hasNote(): bool
    {
        return !empty($this->noteContent);
    }

    /**
     * タグを設定
     *
     * @param string[] $tags タグ名の配列
     * @return self
     */
    public function setTags(array $tags): self
    {
        $this->tags = $tags;
        return $this;
    }

    /**
     * タグを取得
     *
     * @return string[]
     */
    public function getTags(): array
    {
        return $this->tags;
    }

    /**
     * タグが設定されているかどうか判定
     *
     * @return bool
     */
    public function hasTags(): bool
    {
        return !empty($this->tags);
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
