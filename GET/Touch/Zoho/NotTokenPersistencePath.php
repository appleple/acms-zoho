<?php

namespace Acms\Plugins\Zoho\GET\Touch\Zoho;

use ACMS_GET;

class NotTokenPersistencePath extends ACMS_GET
{
    public function get()
    {
        return env('ZOHO_TOKEN_PERSISTENCE_PATH') === '' ? $this->tpl : '';
    }
}
