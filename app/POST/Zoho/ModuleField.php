<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\ModuleField as ZohoModuleFieldMapper;

class ModuleField extends Zoho
{
    public function post()
    {
        $moduleApiName = $this->Post->get('moduleApiName', '');
        if (!isset($moduleApiName) || empty($moduleApiName)) {
            AcmsLogger::error('【Zoho plugin】モジュールのAPI名が必要です。');
            return Common::ResponseJson(['error' => 'moduleApiName is required']);
        }

        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            if (is_null($zohoClient->getAccessToken())) {
                AcmsLogger::error('【Zoho plugin】認証に失敗しました。');
                return Common::ResponseJson(['error' => 'Zoho authentication failed']);
            }

            // Zoho からモジュールフィールドを取得
            $api = new ZohoApi($zohoClient);
            $moduleFields = $api->field()->getModuleFields($moduleApiName);

            $moduleFieldMapper = new ZohoModuleFieldMapper($moduleFields, new Field());

            return Common::ResponseJson($moduleFieldMapper->toArray());
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】モジュールフィールド情報の取得に失敗しました: ' . $e->getMessage());
            return Common::ResponseJson(['error' => 'Failed to fetch module fields']);
        }
    }
}
