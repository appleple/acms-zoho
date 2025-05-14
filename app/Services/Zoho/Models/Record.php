<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Models;

/**
 * フォームからPOSTするときのa-blogcms のフィールド と ZohoCRM のデータマッピングを表現するレコードクラス
 */
class Record
{
    /** @var string|null ID */
    private $id;

    /** @var string API名 */
    private $scope;

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
     * @param string $scope API名
     * @param string $type insert|update
     * @param string $uniqueKey
     */
    public function __construct(string $scope, string $type, string $uniqueKey = '')
    {
        $this->scope = $scope;
        $this->type = $type;
        $this->uniqueKey = $uniqueKey;
    }

    /**
     * @return string ex) Reads, Contacts
     */
    public function getScope(): string
    {
        return $this->scope;
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
            'scope' => $this->scope,
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
        $record = new self($data['scope'], $data['type'], $data['uniqueKey'] ?? '');

        if (isset($data['field']) && is_array($data['field'])) {
            $record->addFields($data['field']);
        }

        if (isset($data['id'])) {
            $record->setId($data['id']);
        }

        return $record;
    }
}
