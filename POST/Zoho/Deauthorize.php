<?php
namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use App;
use AcmsLogger;
use Common;

class Deauthorize extends ACMS_POST
{
    public function post()
    {
        /** @var \Acms\Plugins\Zoho\Api $client */
        $client = App::make('zoho.api');
        try {
            $client->deauthorize();
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】OAuth認証を解除しました。');
            }
        } catch (\Exception $e) {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error('【Zoho plugin】OAuth認証解除に失敗しました。', Common::exceptionArray($e));
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
            $this->addError('認証解除に失敗しました。');
        }

        return $this->Post;
    }
}
