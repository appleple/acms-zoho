<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Mapper;

use Field;
use Acms\Plugins\Zoho\Services\Zoho\Mapper;
use Acms\Plugin\Zoho\Services\Zoho\Models\Module as ModuleModel;
use com\zoho\crm\api\modules\Modules as ZohoModules;

class Module extends Mapper
{
    /** @var ZohoModules[] */
    public $modules;

    /** @var Field FormIDの拡張アプリ設定 */
    public $config;

    /**
     * コンストラクタ
     *
     * @param ZohoModules[] $modules
     * @param Field $config
     */
    public function __construct(array $modules, Field $config)
    {
        $this->modules = $modules;
        $this->config = $config;
    }

    /**
     * 指定されたAPI名がモジュールのリストに存在するかどうか
     *
     * @param string $apiName
     * @return boolean|string 存在しなかったAPI名を返す
     */
    public function isModuleExists(string $apiName)
    {
        if (empty($this->modules) || !is_array($this->modules)) {
            return false;
        }

        foreach ($this->modules as $module) {
            if ($module instanceof ZohoModules && $module->getAPIName() === $apiName) {
                return true;
            }
        }

        return $apiName;
    }
}
