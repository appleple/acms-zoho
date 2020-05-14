<?php

namespace Acms\Plugins\Zoho;

use Acms\Services\Facades\Process;

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
        $id = $thisModule->Post->get('id');
        $fd = $thisModule->Post->getChild('field')->serialize();
        $refreshToken = config('zoho_refresh_token');

        $info = $thisModule->loadForm($id);
        if (empty($info)) {
            userErrorLog('Not Found Form.');
            return;
        }
        $config = $info['data']->getChild('mail');

        $className = __NAMESPACE__ . '\\' . 'Engine';
        if ($config->get('Background') === '1') {
            $autoload = dirname(__FILE__).'/vendor/autoload.php';
            $manager = Process::newProcessManager();
            $manager->addTask(function () use ($id, $fd, $refreshToken, $className, $autoload) {
                require_once $autoload;
                try {
                    $engine = new $className($id, $fd, $refreshToken);
                    $engine->send();
                } catch (\Exception $e) {
                    userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
                }
            });
            $manager->run();
        } else {
            try {
                $engine = new $className($id, $fd, $refreshToken);
                $engine->send();
            } catch (\Exception $e) {
                userErrorLog('ACMS Warning: Zoho plugin, ' . $e->getMessage());
            }
        }

    }
}
