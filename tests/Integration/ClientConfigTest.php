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
}
