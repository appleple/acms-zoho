<?php

namespace Acms\Plugins\Zoho\POST;

use ACMS_POST;
use Acms\Plugins\Zoho\Services\Zoho\RequiresAdministrator;
use Field;

class Zoho extends ACMS_POST
{
    use RequiresAdministrator;
}
