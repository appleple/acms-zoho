<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Store;

use Acms\Plugins\Zoho\Services\Zoho\Store\CustomFileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store;
use com\zoho\api\authenticator\OAuthToken;
// use com\zoho\api\authenticator\Strore\FileStore;

class File extends Store
{
    /**
     * File constructor.
     *
     * @param string $path 保存先のファイルパス
     */
    public function __construct(string $path)
    {
        $this->store = new CustomFileStore($path);
    }
}
