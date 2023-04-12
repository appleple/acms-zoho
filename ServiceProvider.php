<?php

namespace Acms\Plugins\Zoho;

use ACMS_App;
use Acms\Services\Common\HookFactory;
use Acms\Services\Common\InjectTemplate;

class ServiceProvider extends ACMS_App
{
    /**
     * @var string
     */
    public $version = '1.0.0';

    /**
     * @var string
     */
    public $name = 'Zoho';

    /**
     * @var string
     */
    public $author = 'com.appleple';

    /**
     * @var string|bool
     */
    public $module = false;

    /**
     * @var string
     */
    public $menu = 'zoho_index';

    /**
     * @var string
     */
    public $desc = 'Zoho API と連携し、お問い合わせフォームなどで送信された内容をZoho CRMに登録します。';

    /**
     * サービスの起動処理
     */
    public function init()
    {
        require_once dirname(__FILE__) . '/vendor/autoload.php';
        $hook = HookFactory::singleton();
        $hook->attach('Zoho', new Hook);
        $inject = InjectTemplate::singleton();

        if (ADMIN === 'app_zoho_index') {
            $inject->add('admin-topicpath', PLUGIN_DIR . 'Zoho/template/admin/topicpath.html');
            $inject->add('admin-main', PLUGIN_DIR . 'Zoho/template/admin/main.html');
        }
        $inject->add('admin-form', PLUGIN_DIR . 'Zoho/template/admin/form.html');
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
