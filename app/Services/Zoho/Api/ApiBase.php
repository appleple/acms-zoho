<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
use Acms\Plugins\Zoho\Services\Zoho\Client;

use com\zoho\crm\api\record\Record as ZohoRecord;

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

    /**
     * Recordオブジェクトを ZohoRecord に変換
     *
     * @param Record $record 変換するレコード
     * @return ZohoRecord 変換されたAPIレコード
     */
    protected function createZohoRecord(Record $record): ZohoRecord
    {
        $scope = $record->getScope();
        $apiRecord = new ZohoRecord();

        if ($record->getId()) {
            $apiRecord->setId($record->getId());
        }

        foreach ($record->getFields() as $labelName => $value) {
            if (empty($labelName)) {
                continue;
            }

            $apiName = $this->getApiNameByLabelName($labelName, $scope);
            if (empty($apiName)) {
                continue;
            }

            $field = new \com\zoho\crm\api\record\Field($apiName);
            $apiRecord->addFieldValue($field, $value);
        }

        return $apiRecord;
    }
}