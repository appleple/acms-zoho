<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\Plugins\Zoho\Services\Zoho\Api\RecordApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\ModuleApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\FieldApi;

/**
 * Zoho CRM APIとの通信を行うエントリーポイントクラス（ApiManagerパターン）
 */
class Api
{
    /** @var Client */
    private $client;

    /** @var array ラベル名からAPI名への変換用マップデータ */
    private $labelNameToApiNameMap = [];

    /** @var RecordApi|null */
    private $recordApi = null;

    /** @var ModuleApi|null */
    private $moduleApi = null;

    /** @var FieldApi|null */
    private $fieldApi = null;

    /**
     * コンストラクタ
     *
     * @param Client $client Zoho APIクライアント
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * ラベル名からAPI名へのマッピング情報を設定
     *
     * @param array $map マッピング情報
     * @return self
     */
    public function setLabelToApiNameMap(array $map)
    {
        $this->labelNameToApiNameMap = $map;

        // 既に作成済みのAPIインスタンスにも設定を反映
        if ($this->recordApi !== null) {
            $this->recordApi->setLabelToApiNameMap($map);
        }
        if ($this->moduleApi !== null) {
            $this->moduleApi->setLabelToApiNameMap($map);
        }
        if ($this->fieldApi !== null) {
            $this->fieldApi->setLabelToApiNameMap($map);
        }

        return $this;
    }

    /**
     * RecordApiインスタンスを取得（遅延初期化）
     *
     * @return RecordApi
     */
    public function record(): RecordApi
    {
        if ($this->recordApi === null) {
            $this->recordApi = new RecordApi($this->client);
            $this->recordApi->setLabelToApiNameMap($this->labelNameToApiNameMap);
        }
        return $this->recordApi;
    }

    /**
     * ModuleApiインスタンスを取得（遅延初期化）
     *
     * @return ModuleApi
     */
    public function module(): ModuleApi
    {
        if ($this->moduleApi === null) {
            $this->moduleApi = new ModuleApi($this->client);
            $this->moduleApi->setLabelToApiNameMap($this->labelNameToApiNameMap);
        }
        return $this->moduleApi;
    }

    /**
     * FieldApiインスタンスを取得（遅延初期化）
     *
     * @return FieldApi
     */
    public function field(): FieldApi
    {
        if ($this->fieldApi === null) {
            $this->fieldApi = new FieldApi($this->client);
            $this->fieldApi->setLabelToApiNameMap($this->labelNameToApiNameMap);
        }
        return $this->fieldApi;
    }

    // === 後方互換性のためのメソッド（既存コードが動作するように） ===

    /**
     * 処理済みレコードを取得（後方互換性）
     *
     * @return array
     */
    public function getProcessedRecords()
    {
        return $this->record()->getProcessedRecords();
    }

    /**
     * レコードを取得する（後方互換性）
     *
     * @param string $moduleAPIName モジュールAPI名
     * @param array $fields 取得するフィールド名のリスト
     * @return array|null 取得されたレコードの配列、失敗時はnull
     */
    public function getRecords(string $moduleAPIName, array $fields = ["id", "Email"])
    {
        return $this->record()->getRecords($moduleAPIName, $fields);
    }

    /**
     * レコードを検索する（後方互換性）
     *
     * @param string $moduleAPIName モジュールAPI名
     * @param string $criteria 検索条件
     * @return array|null 検索されたレコードの配列、失敗時はnull
     */
    public function searchRecords(string $moduleAPIName, string $criteria)
    {
        return $this->record()->searchRecords($moduleAPIName, $criteria);
    }

    /**
     * レコードを挿入する（後方互換性）
     *
     * @param array $records 挿入するレコードの配列
     * @return bool 成功した場合はtrue
     */
    public function insertRecords(array $records)
    {
        return $this->record()->insertRecords($records);
    }

    /**
     * レコードを更新する（後方互換性）
     *
     * @param array $records 更新するレコードの配列
     * @return bool 成功した場合はtrue
     */
    public function updateRecords(array $records)
    {
        return $this->record()->updateRecords($records);
    }

    /**
     * 関連レコードを更新する（後方互換性）
     *
     * @param array $relatedScopes 関連スコープの配列
     * @return bool 成功した場合はtrue
     */
    public function updateRelatedRecords(array $relatedScopes)
    {
        return $this->record()->updateRelatedRecords($relatedScopes);
    }

    /**
     * モジュール一覧を取得する（後方互換性）
     *
     * @param bool $includeFields フィールド情報も含めるかどうか
     * @return array モジュール情報の配列
     */
    public function getModules(bool $includeFields = false): array
    {
        return $this->module()->getModules($includeFields);
    }

    /**
     * モジュールフィールド情報を取得する（後方互換性）
     *
     * @param string $moduleApiName モジュールAPI名
     * @return array フィールド情報の配列
     */
    public function getModuleFields(string $moduleApiName): array
    {
        return $this->field()->getModuleFields($moduleApiName);
    }
}