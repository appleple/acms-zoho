<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Store\File as ZohoFileStore;
use ACMS_GET;
use Template;
use ACMS_Corrector;

class Admin extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());

        $zohoClient = new ZohoClient();

        // 接続環境・データセンターはいずれも認証時に Zoho から自動判定して保存する値。
        // 認証設定セクション（このモジュール）で読み取り専用表示するため {environment} / {dataCenter}
        // として渡す（未認証時はテンプレート側で認証状態により出し分ける）。
        $baseVars = [
            'authorized' => 'false',
            'environment' => ZohoClient::getEnvironment(BID)->value,
            'dataCenter' => ZohoClient::getDataCenter(BID)->value,
        ];

        /**
         * Todo: ZohoClientを使用した実装に変更
         */
        // 現在のブログのトークンが保存されているかどうか
        $tokenId = $zohoClient->getTokenIdByBid(BID);
        if (!$tokenId) {
            return $Tpl->render($baseVars);
        }

        // トークンIDを元にストアからトークンを取得
        $tokenStore = $zohoClient->getTokenStore();
        $token = null;
        if ($tokenStore === 'file') {
            $tokenPresistencePath = $zohoClient->getTokenPresistencePath();
            if ($tokenPresistencePath === '' || !is_string($tokenPresistencePath)) {
                // 永続化トークンのストアパスが未設定
                return $Tpl->render([
                    'authorized' => 'false',
                ]);
            }
            $fileStore = new ZohoFileStore($tokenPresistencePath);
            $token = $fileStore->findTokenById($tokenId);
        }
        if ($token === null) {
            return $Tpl->render($baseVars);
        }
        $accessToken = $token->getAccessToken();

        if (is_null($accessToken)) {
            return $Tpl->render($baseVars);
        }

        $userSignature = $token->getUserSignature();
        $userName = $userSignature !== null ? $userSignature->getName() : '';

        return $Tpl->render(array_merge($baseVars, [
            'authorized' => 'true',
            'tokenId' => $token->getId(),
            'clientId' => $token->getClientId(),
            'secretId' => $token->getClientSecret(),
            'userName' => $userName,
        ]));
    }
}
