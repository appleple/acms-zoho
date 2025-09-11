<?php

namespace Acms\Plugins\Zoho;

use AcmsLogger;
use Acms\Services\Facades\Common;
// use Acms\Services\Common\HookFactory as ACMS_Hook;
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
    public function afterPostFire($thisModule)
    {
        // Hook処理動作条件
        if (($thisModule instanceof ACMS_POST_Form_Submit)) {
            $this->zohoFormSubmit($thisModule);
        } elseif (($thisModule instanceof ACMS_POST_Form_Update)) {
            $this->zohoFormUpdate($thisModule);
        }
    }

    public function zohoFormSubmit($thisModule)
    {
        if (!$thisModule->Post->isValidAll()) {
            return;
        }
        $step = $thisModule->Post->get('error');
        if (empty($step)) {
            $step = $thisModule->Get->get('step');
        }
        $step = $thisModule->Post->get('step', $step);
        if (in_array($step, ['forbidden', 'repeated'])) {
            return;
        }

        $id = $thisModule->Post->get('id');
        $info = $thisModule->loadForm($id);
        if (empty($info)) {
            return;
        }

        // if (HOOK_ENABLE) {
        //     $hook = ACMS_Hook::singleton();
        //     $hook->call('beforeZohoRequest', [$thisModule]);
        // }

        try {
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】Zoho CRM へデータ登録処理を開始します。');
            }
            $engine = new Engine($thisModule->Post->getChild('field'), $info['data']->getChild('mail'));
            $engine->send();
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info('【Zoho plugin】Zoho CRM へのデータ登録処理が終了しました。');
            }

            // if (HOOK_ENABLE) {
            //     $hook = ACMS_Hook::singleton();
            //     $hook->call('afterZohoRequestSuccess', [$thisModule]);
            // }
        } catch (\ZCRMException $e) {
            // if (HOOK_ENABLE) {
            //     $hook = ACMS_Hook::singleton();
            //     $hook->call('afterZohoRequestError', [$thisModule, $e]);
            // }

            if ($this->isDebugMode()) {
                throw $e;
            }
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error(
                    '【Zoho plugin】Zoho CRM へのデータ登録処理でエラーが発生しました。',
                    Common::exceptionArray($e, [
                        'code' => $e->getExceptionCode(),
                        'details' => $e->getExceptionDetails(),
                    ]),
                );
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
        } catch (\Exception $e) {
            // if (HOOK_ENABLE) {
            //     $hook = ACMS_Hook::singleton();
            //     $hook->call('afterZohoRequestError', [$thisModule, $e]);
            // }

            if ($this->isDebugMode()) {
                throw $e;
            }
            if (class_exists('AcmsLogger')) {
                AcmsLogger::error('【Zoho plugin】Zoho CRM へのデータ登録処理でエラーが発生しました。', Common::exceptionArray($e));
            } else {
                userErrorLog('ACMS Error: Zoho plugin, ' . $e->getMessage());
            }
        }

        // if (HOOK_ENABLE) {
        //     $hook = ACMS_Hook::singleton();
        //     $hook->call('afterZohoRequest', [$thisModule]);
        // }
    }

    public function zohoFormUpdate($thisModule)
    {
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

        /**
     * JSが更新された場合に、以前のバージョンで作られたキャッシュを使用しないようにキャッシュバスティングを行う
     * scriptタグでJSを読み込む際に、acmsのグローバル変数を経由する
     *
     * @param \Field &$globalVars
     */
    public function extendsGlobalVars(&$globalVars)
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
