<?php

namespace Acms\Plugins\Zoho;
use Process;

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
          $manager = Process::newProcessManager();
          $manager->addTask(function () use ($formCode, $thisModule) {
            $engine = new Engine($formCode, $thisModule);
            $engine->send();
          });
          $manager->run();
        } catch (\Exception $e) {
            userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
        }
    }
}
