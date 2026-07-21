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

        if (
            $clientId !== '' &&
            is_string($clientId) &&
            $clientSecret !== '' &&
            is_string($clientSecret) &&
            $redirectUrl !== '' &&
            is_string($redirectUrl)
        ) {
            $session = Session::handle();
            $session->set('zoho_client_id', $clientId);
            $session->set('zoho_client_secret', $clientSecret);
            $session->set('zoho_redirect_url', $redirectUrl);
            $session->save();

            // 認可の起点となる accounts URL。初回は既定 US（accounts.zoho.com）から開始し、
            // 非 US ユーザーは Zoho の Multi-DC でログイン時に地域へ自動リダイレクトされる。
            // 2 回目以降は前回のコールバックで自動判定・保存した DC の地域サーバーを使う。
            $url = ZohoClient::oauthAccountsBaseUrl(ZohoClient::getDataCenter(BID)) . '/oauth/v2/auth?' . http_build_query([
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
    }
}
