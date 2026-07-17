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

        // 管理画面で選択された接続環境・データセンター（許可値以外は既定へフォールバック）。
        $environment = $this->Post->get('zoho_environment', 'production');
        if (!in_array($environment, ZohoClient::ENVIRONMENTS, true)) {
            $environment = 'production';
        }
        $dataCenter = $this->Post->get('zoho_data_center', 'us');
        if (!in_array($dataCenter, ZohoClient::DATA_CENTERS, true)) {
            $dataCenter = 'us';
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
            // 認証成功後（Callback）に config へ永続化するため、選択値をセッションに引き継ぐ。
            $session->set('zoho_environment', $environment);
            $session->set('zoho_data_center', $dataCenter);
            $session->save();

            // accounts URL は選択されたデータセンターに連動（既定 US=accounts.zoho.com）。
            $url = ZohoClient::oauthAccountsBaseUrl($dataCenter) . '/oauth/v2/auth?' . http_build_query([
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
