<?php
namespace Acms\Plugins\Zoho;

use ACMS_App;
use Acms\Services\Common\HookFactory;
use Acms\Services\Common\InjectTemplate;
use Acms\Services\Facades\Storage;

class ServiceProvider extends ACMS_App
{
    public $version     = '1.0.0';
    public $name        = 'Zoho';
    public $author      = 'com.appleple';
    public $module      = false;
    public $menu        = 'zoho_index';
    public $desc        = 'Zoho API と連携し、お問い合わせフォームなどで送信された内容をZoho CRMに登録します';

    /**
     * サービスの起動処理
     */
    public function init()
    {
        require_once dirname(__FILE__).'/vendor/autoload.php';
        $hook = HookFactory::singleton();
        $hook->attach('Zoho', new Hook);
        $inject = InjectTemplate::singleton();

        if (ADMIN === 'app_zoho_index') {
            $inject->add('admin-topicpath', PLUGIN_DIR . 'Zoho/theme/topicpath.html');
            $inject->add('admin-main', PLUGIN_DIR . 'Zoho/theme/index.html');
        } else if (ADMIN === 'module_edit') {
            $inject->add('admin-module-config-Zoho_Records', PLUGIN_DIR . 'Zoho/theme/records_body.html');
        }
        $inject->add('admin-form', PLUGIN_DIR . 'Zoho/theme/form.html');
        $inject->add('admin-module-select', PLUGIN_DIR . 'Zoho/theme/select.user.html');
    }
    /**
     * インストールする前の環境チェック処理
     *
     * @return bool
     */
    public function checkRequirements()
    {
        return true;
    }

    /**
     * インストールするときの処理
     * データベーステーブルの初期化など
     *
     * @return void
     */
    public function install()
    {

    }

    /**
     * アンインストールするときの処理
     * データベーステーブルの始末など
     *
     * @return void
     */
    public function uninstall()
    {
    }

    /**
     * アップデートするときの処理
     *
     * @return bool
     */
    public function update()
    {
        return true;
    }

    /**
     * 有効化するときの処理
     *
     * @return bool
     */
    public function activate()
    {
        return true;
    }

    /**
     * 無効化するときの処理
     *
     * @return bool
     */
    public function deactivate()
    {
        return true;
    }
}
