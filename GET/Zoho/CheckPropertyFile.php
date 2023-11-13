<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use ZCRMConfigUtil;
use ACMS_GET;
use Template;
use ACMS_Corrector;
use ZohoOAuth;
use App;


class CheckPropertyFile extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        $client = App::make('zoho.api');
        if ($client->authorized === false) {
            return $Tpl->render([]);
        }
        ZCRMConfigUtil::initialize(true);
        $userName = ZCRMConfigUtil::getConfigValue("currentUserEmail");
        $persistencePath = ZohoOAuth::getConfigValue("token_persistence_path");
        $accessType = ZohoOAuth::getConfigValue("access_type");
        return $Tpl->render([
            "userNameError" => $userName ? "false" : "true",
            "tokenPathError" => $persistencePath ? "false" : "true",
            "accessTypeError" => $accessType ? "false" : "true"
        ]);
    }
}
