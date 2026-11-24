<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use ACMS_GET;
use ACMS_POST;
use Acms\Plugins\Zoho\GET\Zoho\Callback;
use Acms\Plugins\Zoho\POST\Zoho\CacheClear;
use Acms\Plugins\Zoho\POST\Zoho\Deauthorize;
use Acms\Plugins\Zoho\POST\Zoho\Module;
use Acms\Plugins\Zoho\POST\Zoho\ModuleField;
use Acms\Plugins\Zoho\POST\Zoho\OAuth2;
use Acms\Plugins\Zoho\Services\Zoho\AdminGuard;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\PreserveGlobalState;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;
use ReflectionProperty;

/**
 * 設定画面から呼ばれるハンドラが、管理者以外を、処理の本体に入る前に拒否することを固定する。
 * ハンドラはコアの CSRF・セッションに依存するためコンストラクタを通さずに生成し、ガードだけを差し替える。
 * ガードより先に本体が動くと、リクエストの値が無いため別の例外になり、このテストは失敗する。
 *
 * Why not 同じプロセスで実行しない: ガードが外れて本体が JSON を返すと、コアが exit してテストランナーごと
 * 終了し、終了コード 0 で途切れるため、ガードの欠落が失敗として検出されない。別プロセスなら、
 * 子プロセスが途中で終了しても「テスト未完了」の失敗として検出できる。
 */
#[RunTestsInSeparateProcesses]
#[PreserveGlobalState(false)]
final class HandlerAdminGuardTest extends TestCase
{
    protected function tearDown(): void
    {
        http_response_code(200);
        parent::tearDown();
    }

    /**
     * @return array<string, array{class-string, bool}>
     */
    public static function guardedHandlers(): array
    {
        return [
            'OAuth2（認可の開始）' => [OAuth2::class, false],
            'Deauthorize（認証の解除）' => [Deauthorize::class, false],
            'Callback（認可コードの受け取り）' => [Callback::class, false],
            'CacheClear（キャッシュ削除）' => [CacheClear::class, true],
            'Module（モジュール一覧の取得）' => [Module::class, true],
            'ModuleField（フィールド定義の取得）' => [ModuleField::class, true],
        ];
    }

    /**
     * @param class-string $class
     */
    #[Test]
    #[DataProvider('guardedHandlers')]
    #[TestDox('管理者以外は、処理の本体に入る前に拒否され、応答の種類（JSON か）も合っている')]
    public function rejectsNonAdministratorBeforeDoingAnything(string $class, bool $expectJson): void
    {
        $received = [];
        $guard = new AdminGuard(
            static fn (): bool => false,
            static function (bool $json) use (&$received): never {
                $received[] = $json;
                throw new \RuntimeException('terminated');
            }
        );
        $handler = (new ReflectionClass($class))->newInstanceWithoutConstructor();
        (new ReflectionProperty($handler, 'adminGuard'))->setValue($handler, $guard);

        try {
            if ($handler instanceof ACMS_GET) {
                $handler->get();
            } else {
                $this->assertInstanceOf(ACMS_POST::class, $handler);
                $handler->post();
            }
            $this->fail('管理者以外が処理の本体まで進んでしまった');
        } catch (\RuntimeException $e) {
            $this->assertSame('terminated', $e->getMessage());
        }

        $this->assertSame([$expectJson], $received);
        $this->assertSame(403, http_response_code());
    }
}
