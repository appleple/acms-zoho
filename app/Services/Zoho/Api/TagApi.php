<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;
use com\zoho\crm\api\tags\TagsOperations;
use com\zoho\crm\api\tags\Tag;
use com\zoho\crm\api\tags\NewTagRequestWrapper;
use com\zoho\crm\api\tags\RecordActionWrapper;
use com\zoho\crm\api\tags\RecordSuccessResponse;
use com\zoho\crm\api\tags\APIException;
use com\zoho\crm\api\util\Choice;

class TagApi extends ApiBase
{
    /**
     * レコードにタグを追加する
     *
     * @param string $recordId レコードのID
     * @param string $moduleApiName モジュールAPI名（Leads, Contacts等）
     * @param string[] $tagNames タグ名の配列
     * @return bool 成功した場合はtrue
     */
    public function addTagsToRecord(string $recordId, string $moduleApiName, array $tagNames): bool
    {
        if (empty($tagNames)) {
            return false;
        }

        try {
            // Tagオブジェクトの配列を作成
            $tagObjects = [];
            foreach ($tagNames as $tagName) {
                $tag = new Tag();
                $tag->setName($tagName);
                $tagObjects[] = $tag;
            }

            // リクエストを構築
            $request = new NewTagRequestWrapper();
            $request->setTags($tagObjects);

            // APIを呼び出し
            $tagsOperations = new TagsOperations();
            $response = $tagsOperations->addTags($moduleApiName, $recordId, $request);

            if ($response != null) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof RecordActionWrapper) {
                    $actionResponses = $responseHandler->getData();

                    foreach ($actionResponses as $actionResponse) {
                        if ($actionResponse instanceof RecordSuccessResponse) {
                            return true;
                        } elseif ($actionResponse instanceof APIException) {
                            $message = $actionResponse->getMessage();
                            if ($message instanceof Choice) {
                                $message = $message->getValue();
                            }
                            AcmsLogger::error('【Zoho plugin】タグの追加に失敗しました。', [
                                'module' => $moduleApiName,
                                'recordId' => $recordId,
                                'tags' => $tagNames,
                                'message' => $message,
                                'code' => $actionResponse->getCode()
                            ]);
                        }
                    }
                } elseif ($responseHandler instanceof APIException) {
                    $message = $responseHandler->getMessage();
                    if ($message instanceof Choice) {
                        $message = $message->getValue();
                    }
                    AcmsLogger::error('【Zoho plugin】タグの追加でAPIエラーが発生しました。', [
                        'module' => $moduleApiName,
                        'recordId' => $recordId,
                        'tags' => $tagNames,
                        'message' => $message,
                        'code' => $responseHandler->getCode()
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】タグの追加で例外が発生しました。', [
                'module' => $moduleApiName,
                'recordId' => $recordId,
                'tags' => $tagNames,
                'message' => $e->getMessage()
            ]);
        }

        return false;
    }
}
