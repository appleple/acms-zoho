<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Builder;

use Acms\Plugins\Zoho\Services\Zoho\Models\Record;

/**
 * 処理済みレコードを管理するコレクションクラス
 *
 * レコードの追加、検索、取得を効率的に行うためのコンテナ
 * 内部的にリストとマップの両方を保持することで、
 * 順序の保持と高速検索の両方を実現する
 */
class ProcessedRecordsCollection
{
    /** @var Record[] 処理済みレコードのリスト */
    private $records = [];

    /** @var array インデックスマップ [module][compareValue] => Record */
    private $indexMap = [];

    /**
     * レコードを追加
     *
     * @param Record $record 追加するレコード
     * @return self
     */
    public function add(Record $record)
    {
        $this->records[] = $record;

        // 比較フィールド値がある場合、インデックスに登録
        if (isset($record->compareFieldValue) && $record->getId()) {
            $module = $record->getModuleApiName();
            $compareValue = $record->compareFieldValue;

            if (!isset($this->indexMap[$module])) {
                $this->indexMap[$module] = [];
            }

            $this->indexMap[$module][$compareValue] = $record;
        }

        return $this;
    }

    /**
     * モジュールと比較フィールド値でレコードを検索
     *
     * @param string $moduleApiName モジュールAPI名
     * @param mixed $compareValue 比較フィールドの値
     * @return Record|null 見つかったレコード、なければnull
     */
    public function findByCompareValue(string $moduleApiName, $compareValue)
    {
        return $this->indexMap[$moduleApiName][$compareValue] ?? null;
    }

    /**
     * モジュールと比較フィールド値でレコードIDを取得
     *
     * @param string $moduleApiName モジュールAPI名
     * @param mixed $compareValue 比較フィールドの値
     * @return string|null レコードID、見つからなければnull
     */
    public function getIdByCompareValue(string $moduleApiName, $compareValue)
    {
        $record = $this->findByCompareValue($moduleApiName, $compareValue);
        return $record ? $record->getId() : null;
    }

    /**
     * 全レコードを取得
     *
     * @return Record[]
     */
    public function all()
    {
        return $this->records;
    }

    /**
     * レコード数を取得
     *
     * @return int
     */
    public function count()
    {
        return count($this->records);
    }

    /**
     * 空かどうか確認
     *
     * @return bool
     */
    public function isEmpty()
    {
        return empty($this->records);
    }

    /**
     * モジュールでフィルタリング
     *
     * @param string $moduleApiName モジュールAPI名
     * @return Record[]
     */
    public function filterByModule(string $moduleApiName)
    {
        return array_filter($this->records, function (Record $record) use ($moduleApiName) {
            return $record->getModuleApiName() === $moduleApiName;
        });
    }
}
