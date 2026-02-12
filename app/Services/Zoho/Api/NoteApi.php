<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Api;

use AcmsLogger;
use com\zoho\crm\api\notes\NotesOperations;
use com\zoho\crm\api\notes\Note;
use com\zoho\crm\api\notes\ParentId;
use com\zoho\crm\api\notes\BodyWrapper;
use com\zoho\crm\api\notes\ActionWrapper;
use com\zoho\crm\api\notes\SuccessResponse;
use com\zoho\crm\api\notes\APIException;
use com\zoho\crm\api\modules\MinifiedModule;
use com\zoho\crm\api\util\Choice;

class NoteApi extends ApiBase
{
    /**
     * レコードにメモを作成する
     *
     * @param string $recordId 親レコードのID
     * @param string $moduleApiName モジュールAPI名（Leads, Contacts等）
     * @param string|null $title メモのタイトル（任意）
     * @param string $content メモの本文
     * @return bool 成功した場合はtrue
     */
    public function createNote(string $recordId, string $moduleApiName, ?string $title, string $content): bool
    {
        try {
            // 親レコードの参照を作成
            $parentId = new ParentId();
            $parentId->setId($recordId);

            $module = new MinifiedModule();
            $module->setAPIName($moduleApiName);
            $parentId->setModule($module);

            // メモを作成
            $note = new Note();
            $note->setNoteContent($content);
            $note->setParentId($parentId);

            if (!empty($title)) {
                $note->setNoteTitle($title);
            }

            // リクエストを送信
            $bodyWrapper = new BodyWrapper();
            $bodyWrapper->setData([$note]);

            $notesOperations = new NotesOperations();
            $response = $notesOperations->createNotes($bodyWrapper);

            if ($response != null) {
                $responseHandler = $response->getObject();

                if ($responseHandler instanceof ActionWrapper) {
                    $actionResponses = $responseHandler->getData();

                    foreach ($actionResponses as $actionResponse) {
                        if ($actionResponse instanceof SuccessResponse) {
                            return true;
                        } elseif ($actionResponse instanceof APIException) {
                            $message = $actionResponse->getMessage();
                            if ($message instanceof Choice) {
                                $message = $message->getValue();
                            }
                            AcmsLogger::error('【Zoho plugin】メモの作成に失敗しました。', [
                                'module' => $moduleApiName,
                                'recordId' => $recordId,
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
                    AcmsLogger::error('【Zoho plugin】メモの作成でAPIエラーが発生しました。', [
                        'module' => $moduleApiName,
                        'recordId' => $recordId,
                        'message' => $message,
                        'code' => $responseHandler->getCode()
                    ]);
                }
            }
        } catch (\Exception $e) {
            AcmsLogger::error('【Zoho plugin】メモの作成で例外が発生しました。', [
                'module' => $moduleApiName,
                'recordId' => $recordId,
                'message' => $e->getMessage()
            ]);
        }

        return false;
    }
}
