<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Services\Zoho\AdminGuard;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * 設定画面から呼ばれる処理を管理者に限るガードを固定する。
 * 既定の終了（die・JSON 応答後の終了）はテストのプロセスごと止めてしまうため、終了処理は例外で代用する。
 */
final class AdminGuardTest extends TestCase
{
    protected function tearDown(): void
    {
        // http_response_code() は CLI でもテスト間で残るため、後続のテストに持ち越さない
        http_response_code(200);
        parent::tearDown();
    }

    /**
     * @param list<bool> $received 終了処理が受け取った json フラグの記録先
     */
    private function terminatingBy(array &$received): \Closure
    {
        return static function (bool $json) use (&$received): never {
            $received[] = $json;
            throw new \RuntimeException('terminated');
        };
    }

    #[Test]
    #[TestDox('管理者なら何もせず通し、終了処理も 403 の設定もしない')]
    public function enforcePassesAdministrator(): void
    {
        http_response_code(200);
        $received = [];
        $guard = new AdminGuard(static fn (): bool => true, $this->terminatingBy($received));

        $guard->enforce('Module');

        $this->assertSame([], $received);
        $this->assertSame(200, http_response_code());
    }

    /**
     * @return array<string, array{bool}>
     */
    public static function responseKinds(): array
    {
        return [
            'ページ表示（リダイレクト系）' => [false],
            'JSON 応答' => [true],
        ];
    }

    #[Test]
    #[DataProvider('responseKinds')]
    #[TestDox('管理者以外は 403 を設定して終了処理を呼び、応答の種類（JSON か）をそのまま伝える')]
    public function enforceDeniesNonAdministrator(bool $json): void
    {
        $received = [];
        $guard = new AdminGuard(static fn (): bool => false, $this->terminatingBy($received));

        try {
            $guard->enforce('Module', $json);
            $this->fail('管理者以外が通ってしまった');
        } catch (\RuntimeException $e) {
            $this->assertSame('terminated', $e->getMessage());
        }

        $this->assertSame(403, http_response_code());
        $this->assertSame([$json], $received);
    }

    #[Test]
    #[TestDox('管理者の判定を省略すると、ログインしていないユーザーは管理者として扱わない')]
    public function enforceDeniesAnonymousByDefault(): void
    {
        $received = [];
        $guard = new AdminGuard(null, $this->terminatingBy($received));

        $this->expectException(\RuntimeException::class);
        try {
            $guard->enforce('Module');
        } finally {
            $this->assertSame(403, http_response_code());
        }
    }
}
