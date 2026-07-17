<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * 認証応答の api_domain から接続環境を判定する Client::detectEnvironment の振る舞いを固定する。
 *
 * 何を保証するか:
 *  - api_domain に sandbox / developer が含まれればそれぞれ sandbox / developer と判定する
 *  - それ以外（www など）や DC 違い（.jp 等）は production と判定する
 *  - 空・null は production にフォールバックする
 */
final class ClientEnvironmentTest extends TestCase
{
    /**
     * @return array<string, array{0: ?string, 1: string}>
     */
    public static function environmentCases(): array
    {
        return [
            'production (us)' => ['https://www.zohoapis.com', 'production'],
            'production (jp)' => ['https://www.zohoapis.jp', 'production'],
            'sandbox (us)' => ['https://sandbox.zohoapis.com', 'sandbox'],
            'sandbox (eu)' => ['https://sandbox.zohoapis.eu', 'sandbox'],
            'developer (us)' => ['https://developer.zohoapis.com', 'developer'],
            '空は production' => ['', 'production'],
            'null は production' => [null, 'production'],
        ];
    }

    #[Test]
    #[TestDox('api_domain から接続環境を判定する')]
    #[DataProvider('environmentCases')]
    public function itDetectsEnvironment(?string $apiDomain, string $expected): void
    {
        $this->assertSame($expected, Client::detectEnvironment($apiDomain));
    }
}
