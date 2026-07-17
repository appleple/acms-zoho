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

        // 使用中環境（実際にフォーム連携で使う環境）。ラジオの選択状態に使う。
        $vars = [
            'environment' => ZohoClient::getEnvironment(BID),
        ];

        // 環境（本番/サンドボックス/開発者）ごとに DC と認証状態をタブへ供給する。
        // 変数は {環境}_{キー}（例: {sandbox_authorized} / {production_dc}）で参照する。
        foreach (ZohoClient::ENVIRONMENTS as $environment) {
            $vars[$environment . '_dc'] = ZohoClient::getDataCenter(BID, $environment);

            foreach ($this->environmentStatus($zohoClient, $environment) as $key => $value) {
                $vars[$environment . '_' . $key] = $value;
            }
        }

        return $Tpl->render($vars);
    }

    /**
     * 指定環境の認証状態を返す（その環境のトークンをファイルストアから参照）。
     *
     * @return array{authorized: string, userName: string, clientId: string, secretId: string, tokenId: string}
     */
    private function environmentStatus(ZohoClient $zohoClient, string $environment): array
    {
        $blank = [
            'authorized' => 'false',
            'userName' => '',
            'clientId' => '',
            'secretId' => '',
            'tokenId' => '',
        ];

        if ($zohoClient->getTokenStore() !== 'file') {
            return $blank;
        }
        $tokenId = $zohoClient->getTokenIdForEnvironment(BID, $environment);
        if (!$tokenId) {
            return $blank;
        }
        $tokenPath = $zohoClient->getTokenPresistencePath();
        if ($tokenPath === '') {
            return $blank;
        }

        $token = (new ZohoFileStore($tokenPath))->findTokenById($tokenId);
        if (!$token || is_null($token->getAccessToken())) {
            return $blank;
        }

        $userSignature = $token->getUserSignature();

        return [
            'authorized' => 'true',
            'userName' => $userSignature !== null ? (string) $userSignature->getName() : '',
            'clientId' => (string) $token->getClientId(),
            'secretId' => (string) $token->getClientSecret(),
            'tokenId' => (string) $token->getId(),
        ];
    }
}
