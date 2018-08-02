<?php

namespace Acms\Plugins\Zoho\GET\Zoho;
use Acms\Plugins\Zoho\Api;
use ACMS_GET;
use Template;
use ACMS_Corrector;

class Admin extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        try {
            $client = new Api();
            $Tpl->add(null, array(
                'authorized' => $client->authorized
            ));
        } catch (\Exception $e) {

        }
        return $Tpl->get();
    }
}
