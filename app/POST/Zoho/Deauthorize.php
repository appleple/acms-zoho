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
use Acms\Plugins\Zoho\Services\Zoho\Store\File as ZohoFileStore;
use com\zoho\crm\api\Initializer;

class Deauthorize extends ACMS_POST
{
    public function post()
    {
        $tokenId = $this->Post->get('zoho_token_id', '');
        $clientId = $this->Post->get('zoho_client_id', '');
        $clientSecret = $this->Post->get('zoho_client_secret', '');
        $redirectUrl = $this->Post->get('zoho_redirect_url', '');

        // 必要な情報が揃っているか確認
        if (empty($clientId) || empty($clientSecret) || empty($redirectUrl) || empty($tokenId)) {
            $this->addError('認証情報が不足しています。');
            return $this->Post;
        }

        try {
            // FileStoreインスタンスを作成
            $fileStore = new ZohoFileStore(env('ZOHO_TOKEN_PERSISTENCE_PATH'));

            // トークンIDからトークン情報を取得
            $token = $fileStore->getTokenById((int)$tokenId);

            if (!$token) {
                throw new \RuntimeException('指定されたトークンが見つかりませんでした。');
            }

            // リフレッシュトークンを取得
            $refreshToken = $token->getRefreshToken();

            // Zoho Clientの作成
            $zohoClient = new ZohoClient(
                $clientId,
                $clientSecret,
                $redirectUrl,
                $refreshToken
            );

            // トークンIDをセット
            $zohoClient->setTokenId((int)$tokenId);

            // 初期化
            if (!$zohoClient->initialize()) {
                throw new \RuntimeException('Zohoクライアントの初期化に失敗しました。');
            }

            // Zoho SDKが初期化されているか確認
            if (Initializer::getInitializer() === null) {
                throw new \RuntimeException('Zoho SDKが初期化されていません。先に認証を行ってください。');
            }

            // トークンを削除
            $zohoClient->deauthorize();

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
}