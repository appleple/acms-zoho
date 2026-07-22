<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use Acms\Services\Facades\Logger;
use Acms\Services\Facades\Common;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\users\UsersOperations;
use com\zoho\crm\api\users\ResponseWrapper;
use com\zoho\crm\api\users\APIException;
use com\zoho\crm\api\users\GetUsersParam;

class UserApi extends ApiBase
{
    /**
     * 現在認証中のZohoユーザー情報を取得する
     *
     * @return array{email: string|null, fullName: string|null}|null
     */
    public function getCurrentUser(): ?array
    {
        try {
            $usersOperations = new UsersOperations();
            $paramInstance = new ParameterMap();
            // type パラメータは SDK 5.x の定義（JSONDetails.json）で String 型。
            // Choice を渡すと型検証（HeaderParamValidator）で TYPE ERROR になるため素の文字列で渡す。
            // add() の docblock は @param object だが実型ヒントは無く、実行時は文字列でよい（SDK 側の不整合）。
            // @phpstan-ignore argument.type
            $paramInstance->add(GetUsersParam::type(), 'CurrentUser');
            $response = $usersOperations->getUsers($paramInstance);

            if ($response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $users = $responseHandler->getUsers();
                    if ($users !== []) {
                        $user = $users[0];
                        return [
                            'email'    => $user->getEmail(),
                            'fullName' => $user->getFullName(),
                        ];
                    }
                } elseif ($responseHandler instanceof APIException) {
                    Logger::warning('【Zoho plugin】ユーザー情報の取得でAPIエラーが発生しました。', [
                        'code' => $responseHandler->getCode(),
                        'message' => $responseHandler->getMessage(),
                        'details' => $responseHandler->getDetails()
                    ]);
                }
            }
        } catch (\Exception $e) {
            Logger::warning('【Zoho plugin】ユーザー情報の取得で例外が発生しました。', Common::exceptionArray($e));
        }

        return null;
    }
}
