<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Store;

use com\zoho\api\authenticator\store\FileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store;

class File extends Store
{
    /**
     * File constructor.
     *
     * @param string $path 保存先のファイルパス
     */
    public function __construct(string $path)
    {
        $this->store = new FileStore($path);
    }

    public function removeTokenById(int $id)
    {
        $store = $this->store;
        $store->deleteToken($id);
    }

    public function findTokenById(int $id)
    {
        $store = $this->store;
        $tokens = $store->getTokens();

        foreach ($tokens as $token) {
            if ($token->getId() == $id) {
                return $token;
            }
        }

        return null;
    }

}
