<?php

/**
 * PHPUnit 用ブートストラップ。
 *
 * ablogcms/testing-framework の共有ブートストラップに上乗せする形で、本プラグイン固有の初期化を行う。
 *  1. testing-framework の bootstrap が a-blog cms 本体（ACMS_ROOT。phpunit.xml の <env> で指定）を
 *     起動し、コアのオートロード・定数・Application コンテナを用意する。これにより DatabaseTestCase や
 *     Config / Field / Login / SQL などコア依存のクラスもテストから利用できる。
 *  2. composer のオートローダを最前段へ再登録し、プラグインクラスをリポジトリ内 app/ から解決させる。
 *  3. プラグイン同梱のランタイム依存（zohocrm/php-sdk-8.0）を app/vendor から読み込む。
 *
 * プラグイン本体のクラス（Acms\Plugins\Zoho\...）は composer の PSR-4（autoload）で解決される。
 */

declare(strict_types=1);

// 本体起動より前に composer のオートローダ（ClassLoader）を確保しておく。
$composerAutoloader = require __DIR__ . '/../../vendor/autoload.php';

require_once __DIR__ . '/../../vendor/ablogcms/testing-framework/bootstrap.php';

// Why not コアのプラグインオートローダに任せないか:
// 本体起動時、コアはプラグイン用オートローダを prepend 登録し、プラグインクラスを
// extension/plugins/Zoho（Docker のバインドマウント先）から読み込む。すると PHPUnit のカバレッジや
// ソース指定が参照するリポジトリ内 app/ と実行パスが食い違い、カバレッジが 0% と計測されてしまう。
// そこで composer のオートローダを最前段へ再登録し、プラグインクラスを app/ から解決させる。
// composer は Acms\Plugins\Zoho\* と vendor パッケージだけを担い、未知のクラスは後段のコアへ委譲する
// ため、コア側のロードに副作用はない。
$composerAutoloader->unregister();
$composerAutoloader->register(true);

$runtimeAutoload = __DIR__ . '/../../app/vendor/autoload.php';
if (is_file($runtimeAutoload)) {
    require_once $runtimeAutoload;
} else {
    // Zoho SDK（com\zoho\crm\api\*）を使うテストは、これが無いと「Class ... not found」で唐突に fatal する。
    // 原因が分かるよう明示し、復旧コマンドを案内する。
    fwrite(STDERR, "[Zoho tests] ランタイム依存が未インストールです: {$runtimeAutoload}\n");
    fwrite(STDERR, "[Zoho tests] 先に `composer install --working-dir=app` を実行してください。\n");
}
