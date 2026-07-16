<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Api;

use Acms\Plugins\Zoho\Services\Zoho\Api;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * Zoho API のエントリーポイント（ApiManager）のうち、通信を伴わない静的ユーティリティを固定する。
 * インスタンス getter（record()/module() 等）は Client と実 API 通信が絡むため実機/E2E の領域。
 */
final class ApiManagerTest extends TestCase
{
    #[Test]
    #[TestDox('cacheLifetime: 環境変数未設定なら既定の 3600 秒を返す')]
    public function cacheLifetimeDefaultsTo3600(): void
    {
        // ZOHO_CACHE_LIFETIME が未設定のテスト環境では既定値（DEFAULT_CACHE_LIFETIME）を返す。
        $this->assertSame(3600, Api::DEFAULT_CACHE_LIFETIME);
        $this->assertSame(3600, Api::cacheLifetime());
    }
}
