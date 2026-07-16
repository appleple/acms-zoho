<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Mapper;

use Field;
use Acms\Plugins\Zoho\Services\Zoho\Mapper;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\ModuleField as ModuleFieldMapper;
use com\zoho\crm\api\modules\Modules as ZohoModules;

class Module extends Mapper
{
    /** @var array<int, mixed> Zohoから取得したモジュールのリスト（要素は ZohoModules を想定。実行時の混入に備え mixed で受ける） */
    public $modules;

    /** @var Field FormIDの拡張アプリ設定 */
    public $config;

    /**
     * コンストラクタ
     *
     * @param array<int, mixed> $modules 要素は ZohoModules を想定
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
     * @return bool
     */
    public function isModuleExists(string $apiName): bool
    {
        if (empty($this->modules) || !is_array($this->modules)) {
            return false;
        }

        foreach ($this->modules as $module) {
            if ($module instanceof ZohoModules && $module->getAPIName() === $apiName) {
                return true;
            }
        }

        return false;
    }

    /**
     * モジュールをタブ名、apiName、項目情報を配列にもつ配列に変換する
     *
     * @return array<int, array<string, mixed>> モジュール情報の配列
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
