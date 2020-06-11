<?php

namespace Acms\Plugins\Zoho\GET\Zoho;
use Acms\Plugins\Zoho\Api;
use ACMS_GET;
use Template;
use ACMS_Corrector;
use Config;

class Admin extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        $config = Config::loadDefaultField();
        $config->overload(Config::loadBlogConfig(BID));
        try {
            $client = new Api($config->get("zoho_refresh_token"));
            $Tpl->add(null, array(
                'authorized' => $client->authorized
            ));
        } catch (\Exception $e) {

        }
        return $Tpl->get();
    }
}
