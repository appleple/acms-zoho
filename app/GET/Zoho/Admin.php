<?php

namespace Acms\Plugins\Zoho\GET\Zoho;

use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Store\File as ZohoFileStore;

use ACMS_GET;
use Template;
use ACMS_Corrector;
use App;

class Admin extends ACMS_GET
{
    public function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());

        // tokenIdの取得
        //
        $tokenId = '1';
        if(!$tokenId && is_string($tokenId)) {
            return $Tpl->render([
                'authorized' => 'false',
            ]);
        }

        $zohoClient = new ZohoClient();
        $tokenStore = $zohoClient->getTokenStore();

        $token = null;
        if($tokenStore === 'file') {
            $tokenPresistencePath = env('ZOHO_TOKEN_PERSISTENCE_PATH');
                if ($tokenPresistencePath === '' || !is_string($tokenPresistencePath)) {
                    // 永続化トークンのパスが未設定
                    return $Tpl->render([
                        'authorized' => 'false',
                    ]);
                }
            $fileStore = new ZohoFileStore($tokenPresistencePath);
            $token = $fileStore->findTokenById($tokenId);
        }

        if (!$token) {
            return $Tpl->render([
                'authorized' => 'false',
            ]);
        }
        $accessToken = $token->getAccessToken();
        return $Tpl->render([
            'authorized' => !is_null($accessToken) ? 'true' : 'false',
        ]);
    }
}
