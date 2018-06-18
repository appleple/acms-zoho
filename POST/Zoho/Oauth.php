<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use Acms\Plugins\Zoho\Api;

class oAuth extends ACMS_POST
{
    public function post()
    {
        new Api();
    }
}
