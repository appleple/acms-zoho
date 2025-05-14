<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Contracts\StoreInterface;
use com\zoho\api\authenticator\store\TokenStore;
use com\zoho\api\authenticator\OAuthToken;

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

    /**
     * grantTokenを元にトークンを取得
     * 認証時以外で使用しないでください。
     *
     * @param string $grantToken 検索するgrantToken
     * @return OAuthToken|null 見つかったトークンまたはnull
     */
    public function findTokenByGrantToken(string $grantToken)
    {
        $store = $this->store;
        $tokens = $store->getTokens();

        foreach ($tokens as $token) {
            if ($token->getGrantToken() === $grantToken) {
                return $token;
            }
        }

        return null;
    }

    /**
     * IDを元にトークンを取得
     *
     * @param string $path 保存先のファイルパス
     * @return OAuthToken|null $token
     */
    public function findTokenById(string $id)
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
        if (!$refreshToken  || is_string($refreshToken)) {
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
