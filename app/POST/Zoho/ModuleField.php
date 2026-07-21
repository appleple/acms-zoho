<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Field;
use Acms\Services\Facades\Common;
use Acms\Services\Facades\Logger;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\ModuleField as ZohoModuleFieldMapper;

class ModuleField extends Zoho
{
    public function post()
    {
        $moduleApiName = $this->Post->get('moduleApiName', '');
        if ($moduleApiName === '') {
            Logger::error('【Zoho plugin】モジュールのAPI名が必要です。');
            return Common::responseJson(['error' => 'moduleApiName is required']);
        }

        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            if (is_null($zohoClient->getAccessToken())) {
                Logger::error('【Zoho plugin】認証に失敗しました。');
                return Common::responseJson(['error' => 'Zoho authentication failed']);
            }

            // Zoho からモジュールフィールドを取得
            $api = new ZohoApi($zohoClient);
            $moduleFields = $api->field()->getModuleFields($moduleApiName);

            $moduleFieldMapper = new ZohoModuleFieldMapper($moduleFields, new Field());
            $fields = $moduleFieldMapper->toArray();

            // Zoho Fields APIはNotesをモジュールフィールドとして返さないため、Note用の仮想フィールドを追加
            $fields[] = ['apiName' => 'Note_Title', 'fieldName' => 'メモのタイトル', 'dataType' => 'note'];
            $fields[] = ['apiName' => 'Note_Content', 'fieldName' => 'メモの本文', 'dataType' => 'note'];

            return Common::responseJson($fields);
        } catch (\Exception $e) {
            Logger::error('【Zoho plugin】モジュールフィールド情報の取得に失敗しました。', Common::exceptionArray($e));
            return Common::responseJson(['error' => 'Failed to fetch module fields']);
        }
    }
}
