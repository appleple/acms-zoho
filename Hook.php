<?php

namespace Acms\Plugins\Zoho;

use ACMS_POST_Form_Submit;

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
        if (!($thisModule instanceof ACMS_POST_Form_Submit)) {
            return;
        }
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
            userErrorLog('Not Found Form.');
            return;
        }

        try {
            $engine = new Engine($info, $thisModule->Post);
            $engine->send();
        } catch (\Exception $e) {
            if ($this->isDebugMode()) {
                throw $e;
            }
            userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
        }

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
