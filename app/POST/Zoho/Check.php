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

            // Zoho からモジュールを取得
            $api = new ZohoApi($zohoClient);
            $modules = $api->getModules();

            $moduleMapper = new ModuleMapper($modules, $info['data']->getChild('mail'));

            $configuredInsertApiNames = $moduleMapper->config->getArray('zoho_form_insert_scope', true);
            $configuredUpdateApiNames = $moduleMapper->config->getArray('zoho_form_update_scope', true);

            $notExistIsertApiNames = [];
            foreach($configuredInsertApiNames as $RawApiName) {
                $explodedApiName = explode(',', $RawApiName);
                foreach($explodedApiName as $apiName) {
                    $isExist = $moduleMapper->isModuleExists(trim($apiName));
                    if(is_string($isExist)) {
                        $notExistUpdateApiNames[] = $isExist;
                        AcmsLogger::error("【Zoho plugin】Zoho CRM にインサート可能なAPI名「{$isExist}」がありません。");
                    }
                }
            }

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
                return AcmsLogger::error("【Zoho plugin】Zoho CRM と一致していないAPI名が存在します。");;
            }

            // var_dump(
            //     '------- not exist insert -------',
            //     $notExistIsertApiNames,
            //     '------- not exist update -------',
            //     $notExistUpdateApiNames,
            // );

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
