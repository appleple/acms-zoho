<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use ACMS_GET;
use Template;
use ACMS_Corrector;
use App;
use Acms\Services\Facades\Config;

class Admin extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        $config = Config::loadDefaultField();
        $config->overload(Config::loadBlogConfig(BID));

        /** @var \Acms\Plugins\Zoho\Api $client */
        $client = App::make('zoho.api');
        if (!$client->tokenPersistenceFileExists()) {
            return $Tpl->render([
                'authorized' => 'false',
            ]);
        }
        $accessToken = $client->getAccessToken();
        return $Tpl->render([
            'authorized' => !empty($accessToken) ? 'true' : 'false',
        ]);
    }
}
