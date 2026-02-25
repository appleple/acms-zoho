<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;

use com\zoho\crm\api\HeaderMap;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\modules\ModulesOperations;
use com\zoho\crm\api\modules\ResponseWrapper;
use com\zoho\crm\api\modules\APIException;

class ModuleApi extends ApiBase
{
    /**
     * モジュール一覧を取得する
     *
     * @param bool $includeFields フィールド情報も含めるかどうか
     * @return array モジュール情報の配列
     */
    public function getModules(bool $includeFields = false): array
    {
        try {
            $moduleOperations = new ModulesOperations();
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();
            $response = $moduleOperations->getModules($paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $modules = $responseHandler->getModules();

                    // 元のZohoモジュールオブジェクトをそのまま返す
                    return $modules;
                } else if ($responseHandler instanceof APIException) {
                    AcmsLogger::warning('【Zoho plugin】モジュール一覧の取得でAPIエラーが発生しました。', [
                        'message' => $responseHandler->getMessage(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】モジュール一覧の取得で例外が発生しました。', [
                'message' => $e->getMessage(),
            ]);
        }

        return [];
    }

    /**
     * 指定されたモジュールの詳細情報を取得する
     *
     * @param string $moduleApiName モジュールAPI名
     * @return object|null Zohoモジュールオブジェクト、失敗時はnull
     */
    public function getModule(string $moduleApiName)
    {
        try {
            $moduleOperations = new ModulesOperations();
            $paramInstance = new ParameterMap();
            $headerInstance = new HeaderMap();
            $response = $moduleOperations->getModule($moduleApiName, $paramInstance, $headerInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $modules = $responseHandler->getModules();

                    if (!empty($modules)) {
                        // 元のZohoモジュールオブジェクトをそのまま返す
                        return $modules[0];
                    }
                } else if ($responseHandler instanceof APIException) {
                    AcmsLogger::warning('【Zoho plugin】モジュール情報の取得でAPIエラーが発生しました。', [
                        'module' => $moduleApiName,
                        'message' => $responseHandler->getMessage(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】モジュール情報の取得で例外が発生しました。', [
                'module' => $moduleApiName,
                'message' => $e->getMessage(),
            ]);
        }

        return null;
    }
}
