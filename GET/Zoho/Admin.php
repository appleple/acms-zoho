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

        /** @var Acms\Plugins\Zoho\Api $client */
        $client = App::make('zoho.api');
        $accessToken = $client->getAccessToken();
        return $Tpl->render([
            'authorized' => !empty($accessToken) ? 'true' : 'false',
        ]);
    }
}
