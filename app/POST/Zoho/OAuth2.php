<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use AcmsLogger;
use Acms\Services\Facades\Session;

class OAuth2 extends ACMS_POST
{
    public function post()
    {
        $clientId = $this->Post->get('zoho_client_id', '');
        $clientSecret = $this->Post->get('zoho_client_secret', '');
        $redirectUrl = $this->Post->get('zoho_redirect_url', '');
        // Zoho に要求する権限（スコープ）。連携し直すと、このスコープでトークンが再発行される。
        //   - modules.ALL  : モジュール（レコード）の操作
        //   - settings.ALL : モジュール定義・フィールド定義などの設定取得
        //   - users.READ   : ユーザー情報の参照（/crm/v8/users）
        //   - org.READ     : 組織情報の参照（/crm/v8/org）
        // org.READ について:
        //   SDK はトークンを保存する際、UserSignature が未設定だと利用者を特定するため
        //   /crm/v8/users と /crm/v8/org を呼ぶ（OAuthToken::getToken → Utility::getUserName）。
        //   この org 呼び出しに org.READ が要る。無い場合 SDK 内部では握りつぶされることも
        //   あるが、本プラグインは SDK 例外を RuntimeException として上位に伝播させるため
        //   （Services/Zoho/Client::initialize）失敗が表面化しうる。取りこぼしを防ぐため付与する。
        $scope = 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ,ZohoCRM.org.READ';

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
            $session->save();

            $url = 'https://accounts.zoho.com/oauth/v2/auth?' . http_build_query([
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
            AcmsLogger::error('【Zoho plugin】OAuth2認証のためのパラメータが不足しています。');
            $this->addError('クライアントID、クライアントシークレットを入力してください。');
            return $this->Post;
        }

        return $this->Post;
    }
}
