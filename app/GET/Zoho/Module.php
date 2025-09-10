<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

// use Tpl;
use ACMS_Corrector;
use Field;
use Template;
use Acms\Plugins\Zoho\GET\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\Module as ModuleMapper;

class Module extends Zoho
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());

        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            if (is_null($zohoClient->getAccessToken())) {
                return;
            }

            // Zoho からモジュールを取得、Mapperの設定
            $api = new ZohoApi($zohoClient);
            $modules = $api->getModules();

            foreach ($modules as $module) {
                $Tpl->add('module:loop', [
                    'apiName' => $module['apiName'],
                ]);
            }
        } catch (\Exception $e) {
        }

        // var_dump($Tpl);

        return $Tpl->get();
    }
}
