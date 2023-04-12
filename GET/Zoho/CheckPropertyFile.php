<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use ZCRMConfigUtil;
use ACMS_GET;
use Template;
use ACMS_Corrector;
use ZohoOAuth;


class CheckPropertyFile extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        ZCRMConfigUtil::initialize(true);
        $userName = ZCRMConfigUtil::getConfigValue("currentUserEmail");
        $persistencePath = ZohoOAuth::getConfigValue("token_persistence_path");
        $accessType = ZohoOAuth::getConfigValue("access_type");
        return $Tpl->render(
            array(
                "userNameError" => $userName ? "false" : "true",
                "tokenPathError" => $persistencePath ? "false" : "true",
                "accessTypeError" => $accessType ? "false" : "true"
            )
        );
    }
}
