<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\Plugins\Zoho\Services\Zoho\Api\RecordApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\ModuleApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\FieldApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\NoteApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\TagApi;
use Acms\Plugins\Zoho\Services\Zoho\Api\UserApi;

/**
 * Zoho CRM APIとの通信を行うエントリーポイントクラス（ApiManagerパターン）
 */
class Api
{
    /**
     * デフォルトのキャッシュ有効期間（秒）
     */
    const DEFAULT_CACHE_LIFETIME = 3600;

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

    /** @var NoteApi|null */
    private $noteApi = null;

    /** @var TagApi|null */
    private $tagApi = null;

    /** @var UserApi|null */
    private $userApi = null;

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
        if ($this->noteApi !== null) {
            $this->noteApi->setLabelToApiNameMap($map);
        }
        if ($this->tagApi !== null) {
            $this->tagApi->setLabelToApiNameMap($map);
        }

        return $this;
    }

    /**
     * RecordApiインスタンスを取得
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
     * ModuleApiインスタンスを取得
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
     * FieldApiインスタンスを取得
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

    /**
     * NoteApiインスタンスを取得
     *
     * @return NoteApi
     */
    public function note(): NoteApi
    {
        if ($this->noteApi === null) {
            $this->noteApi = new NoteApi($this->client);
            $this->noteApi->setLabelToApiNameMap($this->labelNameToApiNameMap);
        }
        return $this->noteApi;
    }

    /**
     * TagApiインスタンスを取得
     *
     * @return TagApi
     */
    public function tag(): TagApi
    {
        if ($this->tagApi === null) {
            $this->tagApi = new TagApi($this->client);
            $this->tagApi->setLabelToApiNameMap($this->labelNameToApiNameMap);
        }
        return $this->tagApi;
    }

    /**
     * UserApiインスタンスを取得
     *
     * @return UserApi
     */
    public function user(): UserApi
    {
        if ($this->userApi === null) {
            $this->userApi = new UserApi($this->client);
        }
        return $this->userApi;
    }

    /**
     * キャッシュの有効期間（秒）を取得
     * 環境変数 ZOHO_CACHE_LIFETIME で上書き可能
     *
     * @return int
     */
    public static function cacheLifetime(): int
    {
        return intval(env('ZOHO_CACHE_LIFETIME', strval(self::DEFAULT_CACHE_LIFETIME)));
    }
}
