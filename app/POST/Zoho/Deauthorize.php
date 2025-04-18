<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use App;
use AcmsLogger;
use Common;
use DB;
use SQL;
use Cache;

use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;

class Deauthorize extends ACMS_POST
{
    public function post()
    {
        // $config = App::make('config');
        // $userEmail = $config->get('zoho_user_email', '');
        // $clientId = $config->get('zoho_client_id', '');
        // $clientSecret = $config->get('zoho_client_secret', '');
        // $redirectUrl = $config->get('zoho_redirect_url', '');
        // $refreshToken = $config->get('zoho_refresh_token', '');
        $userEmail = $this->Post->get('zoho_user_email', '');
        $clientId = $this->Post->get('zoho_client_id', '');
        $clientSecret = $this->Post->get('zoho_client_secret', '');
        $refreshToken = $this->Post->get('zoho_refresh_token', '');
        $redirectUrl = $this->Post->get('zoho_redirect_url', '');

        // 必要な情報が揃っているか確認
        if (empty($userEmail) || empty($clientId) || empty($clientSecret) || empty($redirectUrl) || empty($refreshToken)) {
            $this->addError('認証情報が不足しています。');
            return $this->Post;
        }

        // Zoho Clientの作成
        $zohoClient = new ZohoClient(
            $userEmail,
            $clientId,
            $clientSecret,
            $redirectUrl,
            $refreshToken
        );

        try {
            // 初期化
            if (!$zohoClient->initialize()) {
                throw new \RuntimeException('Zohoクライアントの初期化に失敗しました。');
            }

            // Zoho SDKが初期化されているか確認
            if (Initializer::getInitializer() === null) {
                throw new \RuntimeException('Zoho SDKが初期化されていません。先に認証を行ってください。');
            }
            // 現在のトークンストアを取得
            $tokenStore = Initializer::getInitializer()->getStore();
            if (!($tokenStore instanceof FileStore)) {
                throw new \RuntimeException('トークンストアがFileStoreではありません。');
            }
            $token = null;
            try {
                $token = $tokenStore->findTokenById($userEmail);
            } catch (\Exception $e) {
                // findTokenByIdでエラーが発生した場合、トークンが見つからない可能性
                AcmsLogger::info('【Zoho plugin】トークンが見つかりませんでした。');
            }
            if ($token) {
                // トークンを無効化
                $token->revoke($userEmail);

                // トークンストアからトークンを削除
                $tokenStore->deleteToken($userEmail);

                AcmsLogger::info('【Zoho plugin】OAuth認証を解除しました。');
                $this->addMessage('Zoho APIの認証を解除しました。');
            } else {
                // トークンが見つからない場合でも成功とする
                AcmsLogger::info('【Zoho plugin】トークンが見つからなかったため、認証解除を完了しました。');
                $this->addMessage('トークンが見つからなかったため、認証解除を完了しました。');
            }

            // 認証解除
            // if (!$zohoClient->deauthorize()) {
            //     throw new \RuntimeException('認証解除に失敗しました。');
            // }

            // 認証情報の削除
            // $this->deleteZohoConfig();

            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】OAuth認証を解除しました。');
            }

            $this->addMessage('Zoho APIの認証を解除しました。');

            $this->redirect(acmsLink([
                'bid' => BID,
                'admin' => 'app_zoho_index',
            ]));
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error('【Zoho plugin】OAuth認証解除に失敗しました。', Common::exceptionArray($e));
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
            $this->addError('認証解除に失敗しました: ' . $e->getMessage());
        }

        return $this->Post;
    }

    /**
     * Zoho関連の設定を削除
     */
    // protected function deleteZohoConfig()
    // {
    //     $sql = SQL::newDelete('config');
    //     $sql->addWhereOpr('config_blog_id', BID);
    //     $sql->addWhereOpr('config_key', 'zoho_refresh_token');
    //     DB::query($sql->get(dsn()), 'exec');

    //     // 必要に応じて他の設定も削除
    //     // 例: zoho_access_token, zoho_token_expiry なども削除する場合

    //     if (class_exists('Cache')) {
    //         Cache::flush('config');
    //     }
    // }
}