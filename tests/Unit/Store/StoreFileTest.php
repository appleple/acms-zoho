<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Store;

use Acms\Plugins\Zoho\Services\Zoho\Store\CustomFileStore;
use Acms\Plugins\Zoho\Services\Zoho\Store\File as FileStoreWrapper;
use Acms\TestingFramework\TestCase;
use com\zoho\api\authenticator\OAuthToken;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;

/**
 * Store（基底）と Store\File（CSV バックエンドを組み立てるサブクラス）の委譲を固定する。
 * Store\File は CustomFileStore を生成し、検索・更新・取得を基底 Store から委譲する。
 */
final class StoreFileTest extends TestCase
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

    private function token(string $clientId): OAuthToken
    {
        /** @var OAuthToken $token */
        $token = (new ReflectionClass(OAuthToken::class))->newInstanceWithoutConstructor();
        $token->setClientId($clientId);
        $token->setClientSecret('secret');
        $token->setRefreshToken('refresh-' . $clientId);
        $token->setAccessToken('access-' . $clientId);
        return $token;
    }

    #[Test]
    #[TestDox('Store\\File は CustomFileStore を内部ストアとして公開する')]
    public function exposesCustomFileStore(): void
    {
        $store = new FileStoreWrapper($this->path);
        $this->assertInstanceOf(CustomFileStore::class, $store->getStore());
    }

    #[Test]
    #[TestDox('findTokenById は保存済みトークンを ID で引く（基底 Store の委譲）')]
    public function findsTokenById(): void
    {
        $store = new FileStoreWrapper($this->path);
        $store->getStore()->saveToken($this->token('client-a'));

        $found = $store->findTokenById('1');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('client-a', $found->getClientId());

        $this->assertNull($store->findTokenById('999'));
    }

    #[Test]
    #[TestDox('updateUserName の後、ユーザー名が反映される')]
    public function updatesUserNameThroughBase(): void
    {
        $store = new FileStoreWrapper($this->path);
        $store->getStore()->saveToken($this->token('client-a'));

        $store->updateUserName('1', 'user@example.com');

        $found = $store->findTokenById('1');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $signature = $found->getUserSignature();
        $this->assertNotNull($signature);
        $this->assertSame('user@example.com', $signature->getName());
    }

    #[Test]
    #[TestDox('removeTokenById は該当トークンを削除する（基底 Store の委譲）')]
    public function removesTokenById(): void
    {
        $store = new FileStoreWrapper($this->path);
        $store->getStore()->saveToken($this->token('client-a'));
        $store->getStore()->saveToken($this->token('client-b'));

        $store->removeTokenById(1);

        $this->assertNull($store->findTokenById('1'));
        $found = $store->findTokenById('2');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('client-b', $found->getClientId());
    }

    #[Test]
    #[TestDox('findTokenByGrantToken は grantToken 一致で保存済みトークンを返す（基底 Store の委譲）')]
    public function findsByGrantToken(): void
    {
        $store = new FileStoreWrapper($this->path);

        /** @var OAuthToken $token */
        $token = (new ReflectionClass(OAuthToken::class))->newInstanceWithoutConstructor();
        $token->setClientId('client-a');
        $token->setClientSecret('secret');
        $token->setGrantToken('grant-xyz');
        $store->getStore()->saveToken($token);

        $found = $store->findTokenByGrantToken('grant-xyz');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('grant-xyz', $found->getGrantToken());
    }

    #[Test]
    #[TestDox('removeTokenByRefreshToken はリフレッシュトークン一致の行を削除する（基底 Store の委譲）')]
    public function removesByRefreshToken(): void
    {
        $store = new FileStoreWrapper($this->path);
        $store->getStore()->saveToken($this->token('client-a')); // refresh-client-a
        $store->getStore()->saveToken($this->token('client-b')); // refresh-client-b

        $store->removeTokenByRefreshToken('refresh-client-a');

        $this->assertNull($store->findTokenById('1'));
        $found = $store->findTokenById('2');
        $this->assertInstanceOf(OAuthToken::class, $found);
        $this->assertSame('client-b', $found->getClientId());
    }

    #[Test]
    #[TestDox('findTokenByGrantToken は該当が無ければ null を返す')]
    public function findTokenByGrantTokenReturnsNull(): void
    {
        $store = new FileStoreWrapper($this->path);
        $store->getStore()->saveToken($this->token('client-a'));

        $this->assertNull($store->findTokenByGrantToken('no-such-grant'));
    }
}
