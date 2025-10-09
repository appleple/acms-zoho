<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use AcmsLogger;
use Common;

use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use com\zoho\crm\api\Initializer;

class Deauthorize extends ACMS_POST
{
    public function post()
    {
        $tokenId = $this->Post->get('zoho_token_id', '');

        // 必要な情報が揃っているか確認
        if (empty($tokenId)) {
            $this->addError('認証情報が不足しています。');
            return $this->Post;
        }

        try {
            // Zoho Clientの作成とトークンIDの設定
            $zohoClient = new ZohoClient();
            $zohoClient->setTokenId((int)$tokenId);

            // トークンIDから初期化（パラメータなしで呼び出すとストアからトークン情報を取得）
            $zohoClientExists = $zohoClient->initialize();

            // 初期化
            if (!$zohoClientExists) {
                throw new \RuntimeException('Zohoクライアントの初期化に失敗しました。');
            }

            // Zoho SDKが初期化されているか確認
            if (Initializer::getInitializer() === null) {
                throw new \RuntimeException('Zoho SDKが初期化されていません。先に認証を行ってください。');
            }

            // トークンを削除
            $zohoClient->deauthorize();

            AcmsLogger::info('【Zoho plugin】OAuth認証を解除しました。');

            $this->addMessage('Zoho APIの認証を解除しました。');

            $this->redirect(acmsLink([
                'bid' => BID,
                'admin' => 'app_zoho_index',
            ]));
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】OAuth認証解除に失敗しました。', Common::exceptionArray($e));
            $this->addError('認証解除に失敗しました: ' . $e->getMessage());
        }

        return $this->Post;
    }
}
