<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Services\Facades\Logger;
use Acms\Services\Facades\Common;
use com\zoho\crm\api\org\OrgOperations;
use com\zoho\crm\api\org\ResponseWrapper;
use com\zoho\crm\api\org\APIException;
use com\zoho\crm\api\org\Org;

class OrgApi extends ApiBase
{
    /**
     * 現在の接続先組織の接続環境種別（production / sandbox / developer / bigin）を取得する。
     *
     * Zoho 公式仕様上、この Organizations API はアクセストークンの実際の環境に関わらず、
     * 常に本番ドメイン（https://www.zohoapis.{domain}）に対して呼び出す必要がある
     * （呼び出し側で SDK を production 環境に固定してから呼ぶこと）。レスポンスの type
     * フィールドが、そのアクセストークンに紐づく実際の環境を示す。
     *
     * @return string|null 取得できた type の値（例: "production"）。失敗時は null
     */
    public function getEnvironmentType(): ?string
    {
        try {
            $orgOperations = new OrgOperations();
            $response = $orgOperations->getOrganization();

            if ($response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $orgs = $responseHandler->getOrg();
                    // SDKのPHPDocはgetOrg()をarray(non-nullable)としているが、実際のプロパティは
                    // 初期値未設定でnullになり得るため、型注釈を信用せず実行時にも確認する。
                    // @phpstan-ignore notIdentical.alwaysTrue
                    if ($orgs !== [] && $orgs !== null) {
                        /** @var Org $org */
                        $org = $orgs[0];
                        $type = $org->getType();
                        // @phpstan-ignore notIdentical.alwaysTrue
                        return $type !== null ? (string) $type->getValue() : null;
                    }
                } elseif ($responseHandler instanceof APIException) {
                    Logger::warning('【Zoho plugin】組織情報の取得でAPIエラーが発生しました。', [
                        'message' => $responseHandler->getMessage(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            Logger::warning('【Zoho plugin】組織情報の取得で例外が発生しました。', Common::exceptionArray($e));
        }

        return null;
    }
}
