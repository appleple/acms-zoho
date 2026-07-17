<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Store;

use Acms\Plugins\Zoho\Services\Zoho\Store\CustomFileStore;
use Acms\TestingFramework\TestCase;
use com\zoho\api\authenticator\OAuthToken;
use com\zoho\crm\api\exception\SDKException;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;

/**
 * OAuth トークンを CSV に永続化する CustomFileStore の CRUD ラウンドトリップを固定する。
 *
 * DB ではなくファイル I/O のみで完結するため、一時ファイルを使って save → get/find → update → delete を
 * 実際に往復させ、CSV への直列化・復元・ID 採番が保たれることを検証する。
 */
final class CustomFileStoreTest extends TestCase
{
    private string $path = '';

    protected function setUp(): void
    {
        parent::setUp();
        $path = tempnam(sys_get_temp_dir(), 'zoho_tokens_');
        $this->assertIsString($path);
        $this->path = $path;
    }

    protected function tearDown(): void
    {
        if ($this->path !== '' && is_file($this->path)) {
            unlink($this->path);
        }
        parent::tearDown();
    }

    private function token(string $clientId, string $refresh, string $access): OAuthToken
    {
        /** @var OAuthToken $token */
        $token = (new ReflectionClass(OAuthToken::class))->newInstanceWithoutConstructor();
        $token->setClientId($clientId);
        $token->setClientSecret('secret-' . $clientId);
        $token->setRefreshToken($refresh);
        $token->setAccessToken($access);
        return $token;
    }

    #[Test]
    #[TestDox('saveToken で ID を採番して保存し、getTokens / findTokenById で復元できる')]
    public function savesAndRetrievesToken(): void
    {
        $store = new CustomFileStore($this->path);
        $token = $this->token('client-a', 'refresh-a', 'access-a');

        $store->saveToken($token);

        // ID が採番される（初回は "1"）。
        $this->assertSame('1', $token->getId());

        $all = $store->getTokens();
        $this->assertCount(1, $all);
        $this->assertSame('client-a', $all[0]->getClientId());
        $this->assertSame('refresh-a', $all[0]->getRefreshToken());
        $this->assertSame('access-a', $all[0]->getAccessToken());

        $found = $store->findTokenById('1');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('client-a', $found->getClientId());
    }

    #[Test]
    #[TestDox('複数トークンは連番で採番され、それぞれ独立して保存される')]
    public function assignsSequentialIds(): void
    {
        $store = new CustomFileStore($this->path);
        $first = $this->token('client-a', 'refresh-a', 'access-a');
        $second = $this->token('client-b', 'refresh-b', 'access-b');

        $store->saveToken($first);
        $store->saveToken($second);

        $this->assertSame('1', $first->getId());
        $this->assertSame('2', $second->getId());
        $this->assertCount(2, $store->getTokens());
    }

    #[Test]
    #[TestDox('updateUserName で該当行のユーザー名を書き換える')]
    public function updatesUserName(): void
    {
        $store = new CustomFileStore($this->path);
        $token = $this->token('client-a', 'refresh-a', 'access-a');
        $store->saveToken($token);

        $store->updateUserName('1', 'user@example.com');

        $found = $store->findTokenById('1');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $signature = $found->getUserSignature();
        $this->assertNotNull($signature);
        $this->assertSame('user@example.com', $signature->getName());
    }

    #[Test]
    #[TestDox('deleteToken / removeTokenById で該当トークンを削除する')]
    public function deletesToken(): void
    {
        $store = new CustomFileStore($this->path);
        $store->saveToken($this->token('client-a', 'refresh-a', 'access-a'));
        $store->saveToken($this->token('client-b', 'refresh-b', 'access-b'));

        $this->assertTrue($store->removeTokenById('1'));

        $remaining = $store->getTokens();
        $this->assertCount(1, $remaining);
        $this->assertSame('client-b', $remaining[0]->getClientId());
    }

    #[Test]
    #[TestDox('findToken はリフレッシュトークン一致で保存済みの ID / アクセストークンを補完する')]
    public function findTokenMergesMatchingRow(): void
    {
        $store = new CustomFileStore($this->path);
        $store->saveToken($this->token('client-a', 'refresh-a', 'access-a'));

        // クライアント情報とリフレッシュトークンだけを持つトークンで検索すると、行の ID / アクセストークンが補完される。
        /** @var OAuthToken $query */
        $query = (new ReflectionClass(OAuthToken::class))->newInstanceWithoutConstructor();
        $query->setClientId('client-a');
        $query->setClientSecret('secret-client-a');
        $query->setRefreshToken('refresh-a');

        $found = $store->findToken($query);
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('1', $found->getId());
        $this->assertSame('access-a', $found->getAccessToken());
    }

    #[Test]
    #[TestDox('saveToken は同一 ID の既存行を上書き更新する')]
    public function saveTokenUpdatesExistingRow(): void
    {
        $store = new CustomFileStore($this->path);
        $store->saveToken($this->token('client-a', 'refresh-a', 'access-a'));

        $update = $this->token('client-a', 'refresh-a', 'access-updated');
        $update->setId('1');
        $store->saveToken($update);

        $all = $store->getTokens();
        $this->assertCount(1, $all);
        $this->assertSame('access-updated', $all[0]->getAccessToken());
    }

    #[Test]
    #[TestDox('findTokenByGrantToken は grantToken 一致で保存済みトークンを返す')]
    public function findTokenByGrantTokenMatches(): void
    {
        $store = new CustomFileStore($this->path);

        /** @var OAuthToken $token */
        $token = (new ReflectionClass(OAuthToken::class))->newInstanceWithoutConstructor();
        $token->setClientId('client-a');
        $token->setClientSecret('secret');
        $token->setGrantToken('grant-xyz');
        $store->saveToken($token);

        $found = $store->findTokenByGrantToken('grant-xyz');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('grant-xyz', $found->getGrantToken());
    }

    #[Test]
    #[TestDox('removeTokenByRefreshToken はリフレッシュトークン一致の行を削除する')]
    public function removesByRefreshToken(): void
    {
        $store = new CustomFileStore($this->path);
        $store->saveToken($this->token('client-a', 'refresh-a', 'access-a'));

        $this->assertTrue($store->removeTokenByRefreshToken('refresh-a'));
        $this->assertCount(0, $store->getTokens());
        $this->assertFalse($store->removeTokenByRefreshToken('refresh-a'));
    }

    #[Test]
    #[TestDox('findTokenByGrantToken は該当が無ければ null を返す')]
    public function findTokenByGrantTokenReturnsNullWhenAbsent(): void
    {
        $store = new CustomFileStore($this->path);
        $store->saveToken($this->token('client-a', 'refresh-a', 'access-a'));

        $this->assertNull($store->findTokenByGrantToken('no-such-grant'));
    }

    #[Test]
    #[TestDox('9 列の旧 CSV は 10 列へ移行され、既存トークンを読み出せる')]
    public function migratesLegacyNineColumnCsv(): void
    {
        // API_DOMAIN 列が無い旧 9 列フォーマットの CSV（ヘッダ + 1 行）を用意する。
        $legacyHeader = 'id,user_name,client_id,client_secret,refresh_token,access_token,grant_token,expiry_time,redirect_url';
        $legacyRow = '1,,client-a,secret,refresh-a,access-a,,,';
        file_put_contents($this->path, $legacyHeader . "\n" . $legacyRow);

        // コンストラクタで 10 列へ移行される。
        $store = new CustomFileStore($this->path);

        $tokens = $store->getTokens();
        $this->assertCount(1, $tokens);
        $this->assertSame('client-a', $tokens[0]->getClientId());
        $this->assertSame('refresh-a', $tokens[0]->getRefreshToken());
    }

    #[Test]
    #[TestDox('findTokenById は該当 ID が無ければ SDKException を投げる')]
    public function findTokenByIdThrowsWhenNotFound(): void
    {
        $store = new CustomFileStore($this->path);
        $store->saveToken($this->token('client-a', 'refresh-a', 'access-a'));

        $this->expectException(SDKException::class);
        $store->findTokenById('999');
    }
}
