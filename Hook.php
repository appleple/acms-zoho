<?php

namespace Acms\Plugins\Zoho;

use Acms\Services\Facades\Process;

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
        $config = $info['data']->getChild('mail');

        $className = __NAMESPACE__ . '\\' . 'Engine';
        if ($config->get('Background') === '1' && class_exists('Process')) {
            $autoload = dirname(__FILE__).'/vendor/autoload.php';
            $manager = Process::newProcessManager();
            $manager->addTask(function () use ($id, $thisModule, $className, $autoload) {
                require_once $autoload;
                try {
                    $engine = new $className($id, $thisModule);
                    $engine->send();
                } catch (\Exception $e) {
                    if (DEBUG_MODE) {
                        throw $e;
                    }
                    userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
                }
            });
            $manager->run();
        } else {
            try {
                $engine = new $className($id, $thisModule);
                $engine->send();
            } catch (\Exception $e) {
                if (DEBUG_MODE) {
                    throw $e;
                }
                userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
            }
        }

    }
}
