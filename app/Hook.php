<?php

namespace Acms\Plugins\Zoho;

use Acms\Services\Facades\Logger;
use Acms\Services\Facades\Common;
use Acms\Services\Common\HookFactory;
use ACMS_POST_Form_Submit;
use ACMS_POST_Form_Update;

class Hook
{
    /**
     * POSTモジュール処理前
     * $thisModuleのプロパティを参照・操作するなど
     *
     * @param ACMS_POST $thisModule
     */
    public function afterPostFire($thisModule): void
    {
        // Hook処理動作条件
        if (($thisModule instanceof ACMS_POST_Form_Submit)) {
            $this->zohoFormSubmit($thisModule);
        } elseif (($thisModule instanceof ACMS_POST_Form_Update)) {
            $this->zohoFormUpdate($thisModule);
        }
    }

    public function zohoFormSubmit($thisModule): void
    {
        if (!$thisModule->Post->isValidAll()) {
            return;
        }
        $step = $thisModule->Post->get('error');
        if (!(bool) $step) {
            $step = $thisModule->Get->get('step');
        }
        $step = $thisModule->Post->get('step', $step);
        if (in_array($step, ['forbidden', 'repeated'], true)) {
            return;
        }

        $id = $thisModule->Post->get('id');
        $info = $thisModule->loadForm($id);
        if (!(bool) $info) {
            return;
        }
        if ($info['data']->getChild('mail')->get('zoho_void') !== 'on') {
            return;
        };

        if ((bool) HOOK_ENABLE) {
            $hook = HookFactory::singleton();
            $hook->call('beforeZohoRequest', [$thisModule]);
        }

        $mailConfig = $info['data']->getChild('mail');
        // 本体が対応しているときは、応答を返したあとに送る（Zoho が遅くても、フォームの応答を待たせない）。
        // 送信の前後の Hook（afterZohoRequest*）も、応答のあとに実行される。画面の内容を変える用途ではなく、
        // エラーの記録などに使うものとして扱う。beforeZohoRequest は、これまでどおり、送信の前（応答の前）に実行する。
        if ($this->shouldDeferRequest()) {
            $this->runAfterResponse(function () use ($thisModule, $mailConfig): void {
                $this->requestZoho($thisModule, $mailConfig);
            });
            return;
        }
        $this->requestZoho($thisModule, $mailConfig);
    }

    /**
     * Zoho CRM へデータを送る（送信の前後の Hook・エラーの記録を含む）
     *
     * @param \ACMS_POST $thisModule
     * @param \Field $mailConfig フォームのメール設定
     */
    private function requestZoho($thisModule, $mailConfig): void
    {
        try {
            $engine = new Engine($thisModule->Post->getChild('field'), $mailConfig);
            $engine->send();

            if ((bool) HOOK_ENABLE) {
                $hook = HookFactory::singleton();
                $hook->call('afterZohoRequestSuccess', [$thisModule]);
            }
        } catch (\ZCRMException $e) {
            if ((bool) HOOK_ENABLE) {
                $hook = HookFactory::singleton();
                $hook->call('afterZohoRequestError', [$thisModule, $e]);
            }

            if ($this->isDebugMode()) {
                throw $e;
            }
            Logger::error(
                '【Zoho plugin】Zoho CRM へのデータ登録処理でエラーが発生しました。',
                Common::exceptionArray($e, [
                    'code' => $e->getExceptionCode(),
                    'details' => $e->getExceptionDetails(),
                ]),
            );
        } catch (\Exception $e) {
            if ((bool) HOOK_ENABLE) {
                $hook = HookFactory::singleton();
                $hook->call('afterZohoRequestError', [$thisModule, $e]);
            }

            if ($this->isDebugMode()) {
                throw $e;
            }
            Logger::error('【Zoho plugin】Zoho CRM へのデータ登録処理でエラーが発生しました。', Common::exceptionArray($e));
        }

        if ((bool) HOOK_ENABLE) {
            $hook = HookFactory::singleton();
            $hook->call('afterZohoRequest', [$thisModule]);
        }
    }

    public function zohoFormUpdate($thisModule): void
    {
    }

    /**
     * Zoho CRM への送信を、応答を返したあとに行うか
     *
     * Why not: デバッグモードでは後回しにしない。エラーを例外として画面に出す動きは、応答のあとでは見えなくなるため。
     */
    private function shouldDeferRequest(): bool
    {
        return !$this->isDebugMode();
    }

    /**
     * 応答を返したあとに処理を実行する（本体が対応しているときだけ）
     *
     * Why not: Response::afterResponse() を直接呼ばない。この仕組みが無い古い本体では、呼び出しが失敗して、
     * フォームの送信に影響するため、本体に afterResponse() があるときだけ使い、無ければ従来どおり、その場で実行する。
     */
    private function runAfterResponse(callable $task): void
    {
        try {
            $response = \Acms\Services\Facades\Application::make('response');
            if (is_object($response) && method_exists($response, 'afterResponse')) {
                $response->afterResponse($task);
                return;
            }
        } catch (\Throwable $e) {
            // 取得できないときは、その場で実行する
        }
        $task();
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
        if (defined('DEBUG_MODE') && (bool) DEBUG_MODE) {
            return true;
        }

        return false;
    }

        /**
     * JSが更新された場合に、以前のバージョンで作られたキャッシュを使用しないようにキャッシュバスティングを行う
     * scriptタグでJSを読み込む際に、acmsのグローバル変数を経由する
     *
     * @param \Field &$globalVars
     */
    public function extendsGlobalVars(&$globalVars): void
    {
        $globalVars->set(
            'ZOHO_JS',
            cacheBusting(
                '/' . DIR_OFFSET . 'extension/plugins/Zoho/dist/acms-zoho.js',
                SCRIPT_DIR . '/extension/plugins/Zoho/dist/acms-zoho.js'
            )
        );
    }
}
