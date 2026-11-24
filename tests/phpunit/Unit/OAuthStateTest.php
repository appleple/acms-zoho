<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Services\Zoho\OAuthState;
use Acms\Services\Session\Engine;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * OAuth の認可の開始と戻りを同じセッションに結びつける state の、発行と照合を固定する。
 * セッションは、未設定のキーに false を返すコアの Session\Engine と同じ振る舞いの配列で代用する。
 */
final class OAuthStateTest extends TestCase
{
    /** @var array<string, mixed> */
    private array $store = [];

    private int $saveCount = 0;

    private function state(): OAuthState
    {
        $store = &$this->store;
        $saveCount = &$this->saveCount;

        $session = $this->createMock(Engine::class);
        // アロー関数は外側の変数を値で捕捉するため、保存の更新が見えるよう参照で捕捉する
        $session->method('get')->willReturnCallback(static function ($key) use (&$store) {
            return $store[$key] ?? false;
        });
        $session->method('set')->willReturnCallback(static function ($key, $value) use (&$store): void {
            $store[$key] = $value;
        });
        $session->method('delete')->willReturnCallback(static function ($key) use (&$store): void {
            unset($store[$key]);
        });
        $session->method('save')->willReturnCallback(static function () use (&$saveCount): void {
            $saveCount++;
        });

        return new OAuthState($session);
    }

    #[Test]
    #[TestDox('発行した state は 32 文字の 16 進数で、セッションに保存され永続化される')]
    public function issueStoresStateInSession(): void
    {
        $state = $this->state()->issue();

        $this->assertMatchesRegularExpression('/\A[0-9a-f]{32}\z/', $state);
        $this->assertSame([$state], array_values($this->store));
        $this->assertGreaterThanOrEqual(1, $this->saveCount);
    }

    #[Test]
    #[TestDox('発行するたびに別の state になる')]
    public function issueReturnsDifferentStateEachTime(): void
    {
        $oauthState = $this->state();

        $this->assertNotSame($oauthState->issue(), $oauthState->issue());
    }

    #[Test]
    #[TestDox('発行した state と同じ値が戻ってきたときだけ受け入れる')]
    public function consumeAcceptsIssuedState(): void
    {
        $oauthState = $this->state();
        $state = $oauthState->issue();

        $this->assertTrue($oauthState->consume($state));
    }

    /**
     * @return array<string, array{mixed}>
     */
    public static function rejectedReceivedStates(): array
    {
        return [
            '別の値' => ['0123456789abcdef0123456789abcdef'],
            '空文字' => [''],
            '未指定（null）' => [null],
            '配列（state[]=x）' => [['x']],
            '数値' => [123],
        ];
    }

    #[Test]
    #[DataProvider('rejectedReceivedStates')]
    #[TestDox('発行した state と一致しない値は拒否する')]
    public function consumeRejectsMismatchedState(mixed $received): void
    {
        $oauthState = $this->state();
        $oauthState->issue();

        $this->assertFalse($oauthState->consume($received));
    }

    #[Test]
    #[TestDox('state を発行していないセッションでは、どんな値も拒否する（認可コードだけ差し込まれる場合）')]
    public function consumeRejectsWhenNothingWasIssued(): void
    {
        $oauthState = $this->state();

        $this->assertFalse($oauthState->consume('anything'));
        $this->assertFalse($oauthState->consume(''));
        $this->assertFalse($oauthState->consume(null));
    }

    #[Test]
    #[TestDox('保存されている値が空文字のときは、空文字が戻ってきても受け入れない')]
    public function consumeRejectsEmptyStoredState(): void
    {
        $this->store['zoho_oauth_state'] = '';

        $this->assertFalse($this->state()->consume(''));
    }

    #[Test]
    #[TestDox('照合に成功した state は使い切りで、同じ値の再利用を拒否する')]
    public function consumeIsSingleUse(): void
    {
        $oauthState = $this->state();
        $state = $oauthState->issue();

        $this->assertTrue($oauthState->consume($state));
        $this->assertFalse($oauthState->consume($state));
    }

    #[Test]
    #[TestDox('照合に失敗しても state を破棄し、同じセッションでの推測の再試行を許さない')]
    public function consumeDiscardsStateEvenWhenRejected(): void
    {
        $oauthState = $this->state();
        $state = $oauthState->issue();

        $this->assertFalse($oauthState->consume('wrong'));
        $this->assertFalse($oauthState->consume($state));
        $this->assertSame([], $this->store);
    }

    #[Test]
    #[TestDox('破棄はセッションに永続化する')]
    public function consumePersistsDiscard(): void
    {
        $oauthState = $this->state();
        $oauthState->issue();
        $saveCountAfterIssue = $this->saveCount;

        $oauthState->consume('wrong');

        $this->assertGreaterThan($saveCountAfterIssue, $this->saveCount);
    }
}
