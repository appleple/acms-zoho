<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Store;

use com\zoho\api\authenticator\store\FileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store;
use com\zoho\api\authenticator\OAuthToken;

class File extends Store
{
    /**
     * File constructor.
     *
     * @param string $path 保存先のファイルパス
     */
    public function __construct(string $path)
    {
        $this->store = new FileStore($path);
    }
}
