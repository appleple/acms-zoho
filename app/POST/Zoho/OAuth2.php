<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use Acms\Services\Facades\Logger;
use Acms\Services\Facades\Session;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;

class OAuth2 extends ACMS_POST
{
    public function post()
    {
        $clientId = $this->Post->get('zoho_client_id', '');
        $clientSecret = $this->Post->get('zoho_client_secret', '');
        $redirectUrl = $this->Post->get('zoho_redirect_url', '');
        $scope = 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ'; // 必要なスコープに調整

        // どの環境（本番/サンドボックス/開発者）を認証するか。タブの認証フォームから渡る。
        $environment = $this->Post->get('zoho_env', 'production');
        if (!in_array($environment, ZohoClient::ENVIRONMENTS, true)) {
            $environment = 'production';
        }

        if (
            !empty($clientId) &&
            is_string($clientId) &&
            !empty($clientSecret) &&
            is_string($clientSecret) &&
            !empty($redirectUrl) &&
            is_string($redirectUrl)
        ) {
            $session = Session::handle();
            $session->set('zoho_client_id', $clientId);
            $session->set('zoho_client_secret', $clientSecret);
            $session->set('zoho_redirect_url', $redirectUrl);
            // 認証対象の環境を Callback へ引き継ぐ（その環境のトークンとして保存するため）。
            $session->set('zoho_auth_env', $environment);
            $session->save();

            // accounts URL は認証対象環境のデータセンター設定に連動（既定 US=accounts.zoho.com）。
            $url = ZohoClient::oauthAccountsBaseUrl(ZohoClient::getDataCenter(BID, $environment)) . '/oauth/v2/auth?' . http_build_query([
                'scope' => $scope,
                'client_id' => $clientId,
                'response_type' => 'code',
                'access_type' => 'offline', // refreshToken をもらうために必須
                'redirect_uri' => $redirectUrl,
                'prompt' => 'consent' // ユーザーに毎回同意画面を出す（オプション）
            ]);

            // バッファをクリアしてリダイレクト
            while (ob_get_level()) {
                ob_end_clean();
            }
            header('Location: ' . $url, true, 302);
            exit;
        } else {
            Logger::error('【Zoho plugin】OAuth2認証のためのパラメータが不足しています。');
            $this->addError('クライアントID、クライアントシークレットを入力してください。');
            return $this->Post;
        }

        return $this->Post;
    }
}
