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
}
