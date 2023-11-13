<?php

namespace Acms\Plugins\Zoho\GET\Zoho;
use Acms\Plugins\Zoho\Api;
use ACMS_GET;
use Template;
use ACMS_Corrector;
use App;
use Config;

class Admin extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        $config = Config::loadDefaultField();
        $config->overload(Config::loadBlogConfig(BID));
        try {
            $client = App::make('zoho.api');
            $Tpl->add(null, array(
                'authorized' => $client->authorized ? 'true' : 'false'
            ));
        } catch (\Exception $e) {

        }
        return $Tpl->get();
    }
}
