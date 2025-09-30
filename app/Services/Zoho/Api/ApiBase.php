<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Plugins\Zoho\Services\Zoho\Client;

abstract class ApiBase
{
    /** @var Client */
    protected $client;

    /** @var array ラベル名からAPI名への変換用マップデータ */
    protected $labelNameToApiNameMap = [];

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
        return $this;
    }

    /**
     * ラベル名からAPI名を取得
     *
     * @param string $labelName ラベル名
     * @param string $moduleName モジュール名
     * @return string API名
     */
    protected function getApiNameByLabelName(string $labelName, string $moduleName)
    {
        if (empty($this->labelNameToApiNameMap)) {
            return $labelName;
        }

        foreach ($this->labelNameToApiNameMap as $dataset) {
            if ($dataset['moduleName'] === $moduleName) {
                $map = $dataset['map'];
                if (isset($map[$labelName])) {
                    return $map[$labelName];
                }
            }
        }

        return '';
    }
}
