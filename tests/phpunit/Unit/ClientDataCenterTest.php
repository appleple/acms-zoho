<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * Zoho OAuth コールバックの location / accounts-server からデータセンターを自動判定する
 * Client::detectDataCenter の振る舞いを固定する。
 *
 * 何を保証するか:
 *  - location が対応 DC コードならそれを（大文字・空白は正規化して）返す
 *  - location が未知でも accounts-server のホストが SDK の DC 別 accounts URL と一致すれば救済する
 *  - どちらでも特定できなければ null を返し、呼び出し側の既定フォールバックに委ねる
 */
final class ClientDataCenterTest extends TestCase
{
    /**
     * @return array<string, array{0: ?string, 1: ?string, 2: ?string}>
     */
    public static function detectCases(): array
    {
        return [
            // location コードがそのまま対応 DC になる
            'location us' => ['us', 'https://accounts.zoho.com', 'us'],
            'location jp' => ['jp', 'https://accounts.zoho.jp', 'jp'],
            'location eu' => ['eu', 'https://accounts.zoho.eu', 'eu'],
            'location ca' => ['ca', 'https://accounts.zohocloud.ca', 'ca'],
            // 大文字・前後空白は正規化される
            'location 大文字/空白' => ['  JP ', null, 'jp'],
            // location が未知でも accounts-server のホストで救済する
            'accounts-server で救済(jp)' => ['', 'https://accounts.zoho.jp/', 'jp'],
            'accounts-server で救済(au)' => ['unknown', 'https://accounts.zoho.com.au', 'au'],
            'accounts-server で救済(cn)' => [null, 'https://accounts.zoho.com.cn', 'cn'],
            // 未対応 DC（uk）はどちらでも特定不能 → null
            'uk は未対応' => ['uk', 'https://accounts.zoho.uk', null],
            // 情報なし → null
            '両方空' => ['', '', null],
            '両方 null' => [null, null, null],
        ];
    }

    #[Test]
    #[TestDox('location / accounts-server から DC を判定する')]
    #[DataProvider('detectCases')]
    public function itDetectsDataCenter(?string $location, ?string $accountsServer, ?string $expected): void
    {
        $this->assertSame($expected, Client::detectDataCenter($location, $accountsServer));
    }
}
