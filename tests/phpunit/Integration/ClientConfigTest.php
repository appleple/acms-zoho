<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Integration;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\TestingFramework\DatabaseTestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;

/**
 * Zoho クライアントが「ブログごとに保存したトークン ID」をコアの config テーブルから引く挙動を検証する。
 *
 * これはプラグイン独自テーブルではなく a-blog cms コアの config テーブル（config_key / config_value /
 * config_blog_id）への読み取りで、唯一の DB 依存ドメインロジック。DatabaseTestCase がトランザクションで
 * 各テストを分離・ロールバックするため、seeder（insertTestData）で入れた行はテスト後に残らない。
 *
 * Client のコンストラクタは CSV トークンストア（ファイル）を生成する副作用を持つが、getTokenIdByBid は
 * それを参照しない。よってファイル I/O を避けるため newInstanceWithoutConstructor で生成し、DB 読みだけを
 * 対象にする。
 */
final class ClientConfigTest extends DatabaseTestCase
{
    private function clientWithoutConstructor(): Client
    {
        /** @var Client $client */
        $client = (new ReflectionClass(Client::class))->newInstanceWithoutConstructor();
        return $client;
    }

    #[Test]
    #[TestDox('config に保存された zoho_token_id を該当ブログ ID で取得する')]
    public function returnsStoredTokenIdForBlog(): void
    {
        $this->insertTestData('config', [
            'config_key' => 'zoho_token_id',
            'config_value' => '4242',
            'config_blog_id' => BID,
        ]);

        $this->assertSame('4242', $this->clientWithoutConstructor()->getTokenIdByBid(BID));
    }

    #[Test]
    #[TestDox('該当ブログにトークン ID の設定が無ければ null を返す')]
    public function returnsNullWhenNotConfigured(): void
    {
        $this->assertNull($this->clientWithoutConstructor()->getTokenIdByBid(BID));
    }

    /**
     * private メソッド resolveResourcePath($scriptDir) を Reflection 経由で呼ぶ。
     * SCRIPT_DIR に依存しないよう $scriptDir を引数で渡す純粋ロジックとして検証する。
     */
    private function resolveResourcePathWith(string $scriptDir): string
    {
        $method = (new ReflectionClass(Client::class))->getMethod('resolveResourcePath');
        $method->setAccessible(true);

        /** @var string $path */
        $path = $method->invoke($this->clientWithoutConstructor(), $scriptDir);
        return $path;
    }

    #[Test]
    #[TestDox('ZOHO_SDK_RESOURCE_PATH 未設定時は SCRIPT_DIR . CACHE_DIR 配下の zoho_sdk を返す')]
    public function resolvesDefaultResourcePathUnderCache(): void
    {
        unset($_ENV['ZOHO_SDK_RESOURCE_PATH']);

        $cacheDir = defined('CACHE_DIR') ? CACHE_DIR : 'cache/';

        $this->assertSame(
            '/var/www/html/' . $cacheDir . 'zoho_sdk',
            $this->resolveResourcePathWith('/var/www/html/')
        );
    }

    #[Test]
    #[TestDox('ZOHO_SDK_RESOURCE_PATH が設定されていればその値を優先する')]
    public function resolvesResourcePathFromEnv(): void
    {
        $_ENV['ZOHO_SDK_RESOURCE_PATH'] = '/custom/zoho/resources';
        try {
            $this->assertSame(
                '/custom/zoho/resources',
                $this->resolveResourcePathWith('/var/www/html/')
            );
        } finally {
            unset($_ENV['ZOHO_SDK_RESOURCE_PATH']);
        }
    }
}
