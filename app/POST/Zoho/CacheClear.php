<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Common;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Services\Facades\Cache;

class CacheClear extends Zoho
{
    public function post()
    {
        try {
            $cache = Cache::module();

            // モジュール一覧キャッシュをクリア
            $cache->forget('zoho-modules');

            // フィールドキャッシュのキー一覧を使って個別にクリア
            $fieldKeys = $cache->get('zoho-cached-field-keys') ?: [];
            foreach ($fieldKeys as $key) {
                $cache->forget($key);
            }
            $cache->forget('zoho-cached-field-keys');
        } catch (\Exception $e) {
            // キャッシュクリアに失敗してもエラーにしない
        }

        return Common::ResponseJson(['success' => true]);
    }
}
