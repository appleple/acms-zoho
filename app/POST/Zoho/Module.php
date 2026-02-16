<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Field;
use Common;
use AcmsLogger;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\Module as ZohoModuleMapper;
use Acms\Services\Facades\Cache;

class Module extends Zoho
{
    public function post()
    {
        $cache = null;
        $cacheKey = 'zoho-modules';

        try {
            $cache = Cache::module();

            if ($cache->has($cacheKey)) {
                return Common::ResponseJson($cache->get($cacheKey));
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】キャッシュの取得に失敗しました。APIから取得します。');
            $cache = null;
        }

        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            if (is_null($zohoClient->getAccessToken())) {
                AcmsLogger::error('【Zoho plugin】認証に失敗しました。');
                return Common::ResponseJson(['error' => 'Zoho authentication failed']);
            }
            // Zoho からモジュールを取得、Mapperの設定
            $api = new ZohoApi($zohoClient);
            $modules = $api->module()->getModules();

            $moduleMapper = new ZohoModuleMapper($modules, new Field());
            $result = $moduleMapper->toArray();

            if ($cache !== null) {
                try {
                    $cache->put($cacheKey, $result, ZohoApi::cacheLifetime());
                } catch (\Exception $e) {
                    AcmsLogger::warning('【Zoho plugin】キャッシュの保存に失敗しました。');
                }
            }

            return Common::ResponseJson($result);
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】モジュール情報の取得に失敗しました: ' . $e->getMessage());
        }
    }
}
