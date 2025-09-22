<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\Module as ZohoModuleMapper;

class Module extends Zoho
{
    public function post()
    {
        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            if (is_null($zohoClient->getAccessToken())) {
                return null;
            }
            // Zoho からモジュールを取得、Mapperの設定
            $api = new ZohoApi($zohoClient);
            $modules = $api->getModules();

            $moduleMapper = new ZohoModuleMapper($modules, new Field());

            return Common::ResponseJson($moduleMapper->toArray());
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】モジュール情報の取得に失敗しました: ' . $e->getMessage());
        }
    }
}
