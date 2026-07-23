<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Acms\Services\Facades\Common;
use Acms\Services\Facades\Logger;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Services\Facades\Cache;
use com\zoho\crm\api\util\ModuleFieldsHandler;

class CacheClear extends Zoho
{
    public function post()
    {
        try {
            $cache = Cache::module();

            // モジュール一覧キャッシュをクリア
            $cache->forget('zoho-modules');

            // フィールドキャッシュのキー一覧を使って個別にクリア
            $cachedFieldKeys = $cache->get('zoho-cached-field-keys');
            $fieldKeys = is_array($cachedFieldKeys) ? $cachedFieldKeys : [];
            foreach ($fieldKeys as $key) {
                $cache->forget($key);
            }
            $cache->forget('zoho-cached-field-keys');
        } catch (\Exception $e) {
            // キャッシュクリアに失敗してもエラーにしない
        }

        // SDK が resourcePath 配下に生成するフィールド定義キャッシュ（fields/*.json）も削除する。
        // これを消さないと autoRefreshFields=false のため CRM 側のフィールド変更が反映されない。
        $this->clearSdkFieldCache();

        return Common::responseJson(['success' => true]);
    }

    /**
     * Zoho SDK のフィールド定義キャッシュファイルを削除する。
     * deleteAllFieldFiles() は Initializer 初期化済みであることが前提のため、先に Client を初期化する。
     *
     * @return void
     */
    private function clearSdkFieldCache(): void
    {
        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            // 認証されていない場合は初期化されず、Initializer が未設定になるためスキップする
            if (is_null($zohoClient->getAccessToken())) {
                return;
            }

            ModuleFieldsHandler::deleteAllFieldFiles();
        } catch (\Exception $e) {
            Logger::warning('【Zoho plugin】SDK フィールドキャッシュの削除に失敗しました。', Common::exceptionArray($e));
        }
    }
}
