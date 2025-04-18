<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Contracts\StoreInterface;
use com\zoho\api\authenticator\store\TokenStore;

class Store implements StoreInterface
{
    /**
     * @var TokenStore
     */
    protected $store;

    /**
     * @return TokenStore
     */
    public function getStore(): TokenStore
    {
        return $this->store;
    }
}
