<?php

namespace Acms\Plugins\Zoho;

use ACMS_App;
use Acms\Services\Common\HookFactory;
use Acms\Services\Common\InjectTemplate;
use Acms\Services\Facades\Storage;
use App;
use AcmsLogger;

class ServiceProvider extends ACMS_App
{
    /**
     * @var string
     */
    public $version = '2.0.23';

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

        App::singleton('zoho.api', Api::class);

        $this->initZohoConfig();
        $this->initZohoOauthLogger();

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

    /**
     * Zoho設定ファイルの初期化
     *
     * @param string $message
     */
    private function initZohoConfig()
    {
        $configFile = 'configuration.properties';
        $oauthConfigFile = 'oauth_configuration.properties';
        $zohoDir = PLUGIN_LIB_DIR . $this->name . '/';
        $resourcesDir = $zohoDir . 'vendor/zohocrm/php-sdk/src/resources/';
        $configFilePath = $zohoDir . $configFile;
        $configFileDestPath = $resourcesDir . $configFile;
        $oauthConfigFilePath = $zohoDir . $oauthConfigFile;
        $oauthConfigFileDestPath = $resourcesDir . $oauthConfigFile;

        if (Storage::exists($resourcesDir) === false) {
            Storage::makeDirectory($resourcesDir);
        }

        if (Storage::exists($configFileDestPath) === false) {
            if (Storage::exists($configFilePath) === false) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::warning(
                        "【Zoho plugin】 Zohoディレクトリに {$configFile} が見つかりませんでした。"
                    );
                } else {
                    userErrorLog(
                        "ACMS Warning: Zoho plugin Zohoディレクトリに {$configFile} が見つかりませんでした。"
                    );
                }
                return;
            }
            $config = Storage::get($configFilePath);
            $config = preg_replace('/{mail}/', '', $config);
            Storage::put($configFileDestPath, $config);
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info("【Zoho plugin】 Zohoの設定ファイルを作成しました。", [
                    'path' => $configFileDestPath,
                ]);
            }
        }
        if (Storage::exists($oauthConfigFileDestPath) === false) {
            if (Storage::exists($oauthConfigFilePath) === false) {
                if (class_exists('AcmsLogger')) {
                    AcmsLogger::warning(
                        "【Zoho plugin】 Zohoディレクトリに {$oauthConfigFile} が見つかりませんでした。"
                    );
                } else {
                    userErrorLog(
                        "ACMS warning: Zoho plugin Zohoディレクトリに {$oauthConfigFile} が見つかりませんでした。"
                    );
                }
                return;
            }
            $oauthConfig = Storage::get($oauthConfigFilePath);
            $oauthConfig = preg_replace('/{client_id}/', '', $oauthConfig);
            $oauthConfig = preg_replace('/{client_secret}/', '', $oauthConfig);
            $oauthConfig = preg_replace('/{redirect_uri}/', '', $oauthConfig);
            $oauthConfig = preg_replace('/{mail}/', '', $oauthConfig);
            Storage::put($oauthConfigFileDestPath, $oauthConfig);
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info("【Zoho plugin】 ZohoのOAuth設定ファイルを作成しました。", [
                    'path' => $oauthConfigFileDestPath,
                ]);
            }
        }
    }

    /**
     * ZohoOAuthログファイルの初期化
     */
    private function initZohoOauthLogger()
    {
        $logFile = 'OAuth.log';
        $zohoDir = PLUGIN_LIB_DIR . $this->name . '/';
        $loggerDir = $zohoDir . 'vendor/zohocrm/php-sdk/src/com/zoho/oauth/logger/';
        $logFilePath = $loggerDir . $logFile;

        if (Storage::exists($loggerDir) === false) {
            Storage::makeDirectory($loggerDir);
        }

        if (Storage::exists($logFilePath) === false) {
            Storage::put($logFilePath, '');
            if (class_exists('AcmsLogger')) {
                AcmsLogger::info("【Zoho plugin】 ZohoのOAuthログファイルを作成しました。", [
                    'path' => $logFilePath,
                ]);
            }
        }
    }
}
