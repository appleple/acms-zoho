<?php
namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use App;

class Deauthorize extends ACMS_POST
{
    public function post()
    {
        /** @var Acms\Plugins\Zoho\Api $client */
        $client = App::make('zoho.api');
        $client->deauthorize();

        return $this->Post;
    }
}
