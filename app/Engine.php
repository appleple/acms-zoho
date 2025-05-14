<?php

namespace Acms\Plugins\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\Record as RecordMapper;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;

/**
 * Zoho拡張アプリの実行クラス
 */
class Engine
{
    /** @var Field */
    private $field;

    /** @var Field */
    private $config;

    /**
     * @var array
     */
    private $records;

    /** @var ZohoClient */
    private $zohoClient;

    /**
     * @param $field Postされたフォームのデータ
     * @param $config フォームIDのconfigデータ
     */
    public function __construct($field, $config)
    {
        $this->field = $field;
        $this->config = $config;
        $this->records = [];

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

            $recordMapper = new RecordMapper($this->field, $this->config);

            // Zoho APIクライアントの作成
            $api = new ZohoApi($this->zohoClient);

            // レコードの作成と処理
            $records = $recordMapper->makeRecords();
            $records = $recordMapper->addFieldsToRecords($records);

            // レコードの更新と作成、更新データと作成データに分割
            $updateRecords = $recordMapper->getRecordsByType($records, 'update');
            $insertRecords = $recordMapper->getRecordsByType($records, 'insert');

            if (!empty($updateRecords)) {
                // var_dump(
                //     'updateRecords',
                //     '<pre>',
                //     $updateRecords,
                //     '</pre>'
                // );
                $api->updateRecords($updateRecords);
            }
            if (!empty($insertRecords)) {
                // var_dump(
                //     'insertRecords',
                //     '<pre>',
                //     $insertRecords,
                //     '</pre>'
                // );
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
