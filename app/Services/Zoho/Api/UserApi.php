<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;
use com\zoho\crm\api\ParameterMap;
use com\zoho\crm\api\util\Choice;
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
            $paramInstance->add(GetUsersParam::type(), new Choice('CurrentUser'));
            $response = $usersOperations->getUsers($paramInstance);

            if ($response != null && $response->isExpected()) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ResponseWrapper) {
                    $users = $responseHandler->getUsers();
                    if (!empty($users)) {
                        $user = $users[0];
                        return [
                            'email'    => $user->getEmail(),
                            'fullName' => $user->getFullName(),
                        ];
                    }
                } elseif ($responseHandler instanceof APIException) {
                    AcmsLogger::warning('【Zoho plugin】ユーザー情報の取得でAPIエラーが発生しました。', [
                        'message' => $responseHandler->getMessage(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::warning('【Zoho plugin】ユーザー情報の取得で例外が発生しました。', [
                'message' => $e->getMessage(),
            ]);
        }

        return null;
    }
}
