<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\Module as ZohoModuleMapper;

class ModuleField extends Zoho
{
    public function post()
    {

        if (isset($_GET['moduleApiName'])) {

            return null;
        }

        // リクエストにjsonパラメータが含まれている場合は、全モジュール情報をJSONで返す
        // if (isset($_GET['json'])) {
        //     $this->returnModulesAsJson();
        //     return null;
        // }

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

            var_dump($moduleMapper->toArray());
            return Common::ResponseJson($moduleMapper->toArray());
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】モジュール情報の取得に失敗しました: ' . $e->getMessage());
        }

    }
}
