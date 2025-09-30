<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Models;

/**
 * フォームからPOSTするときのa-blogcms のフィールド と ZohoCRM のデータマッピングを表現するレコードクラス
 * Todo: クラス名を Command に変更する
 */
class Record
{
    /** @var string|null ID */
    private $id;

    /** @var string モジュールAPI名 */
    private $moduleApiName;

    /**
     * Todo: 何用か調査
     * @var string
     */
    private $uniqueKey;

    /**
     * a-blog cms のフィールド
     * @var array
     */
    private $fields = [];

    /** @var string insert|update */
    private $type;

    /**
     * @param string $moduleApiName モジュールAPI名
     * @param string $type insert|update
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
     * レコードを配列形式に変換
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'moduleApiName' => $this->moduleApiName,
            'uniqueKey' => $this->uniqueKey,
            'type' => $this->type,
            'field' => $this->fields,
            'id' => $this->id
        ];
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
