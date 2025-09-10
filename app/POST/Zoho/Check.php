<?php

namespace Acms\Plugins\Zoho\POST\Zoho;

use Common;
use Field;
use AcmsLogger;
use ACMS_POST_Form;
use Acms\Plugins\Zoho\POST\Zoho;
use Acms\Plugins\Zoho\Services\Zoho\Client as ZohoClient;
use Acms\Plugins\Zoho\Services\Zoho\Mapper\Module as ModuleMapper;
use Acms\Plugins\Zoho\Services\Zoho\Api as ZohoApi;

class Check extends Zoho
{
    public function post()
    {
        $formCode = $this->Post->get('formCode');
        $form = new ACMS_POST_Form();
        $info = $form->loadForm($formCode);

        if (empty($info)) {
            return;
        }

        try {
            $zohoClient = new ZohoClient();
            $zohoClient->initialize();

            if (is_null($zohoClient->getAccessToken())) {
                return;
            }

            // Zoho からモジュールを取得、Mapperの設定
            $api = new ZohoApi($zohoClient);
            $modules = $api->getModules();
            $moduleMapper = new ModuleMapper($modules, $info['data']->getChild('mail'));

            //  ZohoCRM に存在しないAPI名が設定されているかチェック
            $isScopeExist = $this->isScopeInApi($moduleMapper);
            if (!$isScopeExist) {
                AcmsLogger::error("【Zoho plugin】Zoho CRM と一致していないAPI名が存在します。");
            }

            $isKeyExist = $this->isKeyInApi($moduleMapper);
            if (!$isScopeExist) {
                AcmsLogger::error("【Zoho plugin】Zoho CRM のAPIにキーが存在しない可能性があります。");
            }

        } catch (\ZCRMException $e) {
            if ($this->isDebugMode()) {
                throw $e;
            }
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error('【Zoho plugin】Zoho CRM へのデータ登録処理でエラーが発生しました。', Common::exceptionArray($e));
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
        }

        return Common::responseJson($this->Post);
    }

    /**
     * ZohoCRM に存在しないAPI名が設定されているかチェック
     *
     * @param ModuleMapper ＄moduleMapper
     * @return bool 存在しないものがあればfalse
     */
    private function isScopeInApi(ModuleMapper &$moduleMapper) {
        // cms から設定を取得
        $configuredInsertApiNames = $moduleMapper->config->getArray('zoho_form_insert_scope', true);
        $configuredUpdateApiNames = $moduleMapper->config->getArray('zoho_form_update_scope', true);

        // インサート可能なAPI名が存在するかチェック
        $notExistIsertApiNames = [];
        foreach($configuredInsertApiNames as $RawApiName) {
            $explodedApiName = explode(',', $RawApiName);
            foreach($explodedApiName as $apiName) {
                $isExist = $moduleMapper->isModuleExists(trim($apiName));
                if(is_string($isExist)) {
                    $notExistIsertApiNames[] = $isExist;
                    AcmsLogger::error("【Zoho plugin】Zoho CRM にインサート可能なAPI名「{$isExist}」がありません。");
                }
            }
        }

        // アップデート可能なAPI名が存在するかチェック
        $notExistUpdateApiNames = [];
        foreach($configuredUpdateApiNames as $RawApiName) {
            $explodedApiName = explode(',', $RawApiName);
            foreach($explodedApiName as $apiName) {
                $isExist = $moduleMapper->isModuleExists(trim($apiName));
                if(is_string($isExist)) {
                    $notExistUpdateApiNames[] = $isExist;
                    AcmsLogger::error("【Zoho plugin】Zoho CRM にアップデート可能なAPI名「 {$isExist}」がありません。");
                }
            }
        }

        if (empty($notExistInsertApiNames) || empty($notExistUpdateApiNames)) {
            return false;
        }

        return true;
    }


    /**
     * ZohoCRM のAPIにキーが存在するかチェック
     *
     * @param ModuleMapper ＄moduleMapper
     * @return bool 存在しないものがあればfalse
     */
    private function isKeyInApi(ModuleMapper &$moduleMapper) {

    }

    /**
     * デバックモードかどうか
     *
     * @return bool
     */
    private function isDebugMode(): bool
    {
        if (function_exists('isDebugMode')) {
            return isDebugMode();
        }
        if (defined('DEBUG_MODE') && DEBUG_MODE) {
            return true;
        }

        return false;
    }
}
