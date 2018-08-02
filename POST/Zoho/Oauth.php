<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use Acms\Plugins\Zoho\Api;

class oAuth extends ACMS_POST
{
    public function post()
    {
        $client = new Api();
        try {
            $client->authorize();
            $this->redirect(acmsLink(array(
                'bid' => BID,
                'admin' => 'app_zoho_index',
            )));
        } catch (\Exception $e) {
            $this->addError('認証に失敗しました。grantトークンが古い可能性があります。');
        }
        return $this->Post;
    }
}
