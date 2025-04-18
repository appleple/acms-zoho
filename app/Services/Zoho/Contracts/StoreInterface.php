<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Contracts;

use com\zoho\api\authenticator\store\TokenStore;

interface StoreInterface
{
    /**
     * @return TokenStore
     */
    public function getStore(): TokenStore;
}
