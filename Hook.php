<?php

namespace Acms\Plugins\Zoho;

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
        $moduleName = get_class($thisModule);

        if ( $moduleName !== 'ACMS_POST_Form_Submit' ) {
            return;
        }
        $formCode = $thisModule->Post->get('id');
        try {
            $engine = new Engine($formCode, $thisModule);
            $engine->send();
        } catch (\Exception $e) {
            userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
        }
    }
}
