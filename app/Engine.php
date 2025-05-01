<?php

namespace Acms\Plugins\Zoho;

use Field;
use Common;
use AcmsLogger;

use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Helper;
use Acms\Plugins\Zoho\Services\Zoho\Api;

class Engine
{
    /**
     * @var \Field
     */
    private $config;

    /**
     * @var \Field
     */
    private $field;

    /**
     * @var array
     */
    private $records;

    /**
     * ラベル名からAPI名への変換用マップデータ
     *
     * @var array{ moduleName: string, map: array<string, string>}
     */
    private $labelNameToApiNameMap;

    /**
     * @var ZohoClient
     */
    private $zohoClient;

    /**
     * Engine constructor.
     * @param array $Form
     * @param \Field $Post
     */
    public function __construct($Form, $Post)
    {
        $this->config = $Form['data']->getChild('mail');
        $this->field = $Post->getChild('field');
        $this->records = array();

        $zohoClient = new ZohoClient();
        $zohoClient->initialize();

        if (is_null($zohoClient->getAccessToken())) {
            return;
        }

        $this->zohoClient = $zohoClient;
    }

        /**
     * Zoho CRMにデータを送信
     */
    public function send()
    {
        try {
            if (is_null($this->zohoClient)) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::error('【Zoho plugin】 Zohoクライアントの初期化に失敗しました。');
                }
                return;
            }

            // Helperの初期化
            $helper = new Helper($this->field, $this->config);

            // Zoho APIクライアントの作成
            $api = new Api($this->zohoClient);

            // レコードの作成と処理
            $records = $helper->makeRecords();
            $records = $helper->addFieldsToRecords($records);

            // レコードの更新と作成、更新データと作成データに分割
            // $updateRecords = $helper->getRecordsByType($records, 'update');
            $insertRecords = $helper->getRecordsByType($records, 'insert');

            // if (!empty($updateRecords)) {
            //     var_dump('updateRecords', $updateRecords);
            //     $api->updateRecords($updateRecords);
            // }
            if (!empty($insertRecords)) {
                $api->insertRecords($insertRecords);
            }

            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】 データの送信が完了しました。');
            }

        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】 データの送信に失敗しました。',
                    Common::exceptionArray($e)
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
        }
    }
}
