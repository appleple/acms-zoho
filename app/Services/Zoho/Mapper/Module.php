<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Mapper;

use Field;
use Acms\Plugins\Zoho\Services\Zoho\Mapper;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\ModuleField as ModuleFieldMapper;
use com\zoho\crm\api\modules\Modules as ZohoModules;

class Module extends Mapper
{

    /** @var ZohoModules[] Zohoから取得したモジュールのリスト */
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

    /**
     * モジュールをタブ名、apiName、項目情報を配列にもつ配列に変換する
     *
     * @return array モジュール情報の配列
     */
    public function toArray()
    {
        if (empty($this->modules) || !is_array($this->modules)) {
            return [];
        }

        $result = [];
        foreach ($this->modules as $module) {
            if (!($module instanceof ZohoModules)) {
                continue;
            }

            $moduleData = [
                'moduleName' => $module->getModuleName(),
                'apiName' => $module->getAPIName(),
                'singularLabel' => $module->getSingularLabel(),
                'fields' => []
            ];

            $result[] = $moduleData;
        }

        return $result;
    }
}
