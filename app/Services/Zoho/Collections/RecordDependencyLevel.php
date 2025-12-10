<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Collections;

use Acms\Plugins\Zoho\Services\Zoho\Models\Record;

/**
 * レコードの依存関係レベルを表すクラス
 *
 * 同じ依存レベルのレコードをまとめて管理する
 */
class RecordDependencyLevel
{
    /** @var int 依存レベル（0=依存なし、1以上=依存あり） */
    private $level;

    /** @var Record[] このレベルのレコード配列 */
    private $records;

    /**
     * @param int $level 依存レベル
     */
    public function __construct(int $level)
    {
        $this->level = $level;
        $this->records = [];
    }

    /**
     * レコードを追加
     *
     * @param Record $record
     * @return self
     */
    public function addRecord(Record $record): self
    {
        $this->records[] = $record;
        return $this;
    }

    /**
     * すべてのレコードを取得
     *
     * @return Record[]
     */
    public function getRecords(): array
    {
        return $this->records;
    }
}
