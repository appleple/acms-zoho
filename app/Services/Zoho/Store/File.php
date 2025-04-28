<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Store;

use com\zoho\api\authenticator\store\FileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store;
use com\zoho\api\authenticator\OAuthToken;

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

    /**
     * IDを元にトークンを削除
     *
     * @param string $path 保存先のファイルパス
     */
    public function removeTokenById(int $id)
    {
        $store = $this->store;
        $store->deleteToken($id);
    }

    /**
     * リフレッシュトークンを元にトークンを削除
     *
     * @param string $path 保存先のファイルパス
     */
    public function removeTokenByRefreshToken(string $refreshToken)
    {
        if(!$refreshToken  || is_string($refreshToken)) {
            return null;
        }
        $store = $this->store;
        $tokens = $store->getTokens();
        foreach ($tokens as $token) {
            if ($token->getRefreshToken() === $refreshToken) {
                $this->removeTokenById($token->getId());
                break;
            }
        }
    }
}
