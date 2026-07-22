<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Services\Zoho\Client;
use Acms\Plugins\Zoho\Services\Zoho\Enums\ZohoEnvironment;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * Organizations API（GET /crm/v8/org）が返す type フィールドから接続環境を検証・正規化する
 * Client::sanitizeEnvironment の振る舞いを固定する。
 *
 * 何を保証するか:
 *  - type が production / sandbox / developer なら対応する ZohoEnvironment を返す
 *  - bigin など Zoho CRM の接続環境として扱わない値は Production にフォールバックする
 *  - 取得失敗（null）・空・未知の値も Production にフォールバックする
 *
 * 背景: 接続環境は認証応答の api_domain 文字列からは判定できない（同意画面でサンドボックス
 * 組織を選んでも api_domain が production ドメインのまま返るケースが実機で確認された）。
 * Zoho 公式は「Organizations API はアクセストークンの環境に関わらず常に本番ドメイン
 * （www.zohoapis.{domain}）に対して呼び出せば type で判定できる」と案内しており、この
 * 方式に従う（呼び出し側で SDK を production に固定してから呼ぶ運用とセットで機能する）。
 */
final class ClientEnvironmentTest extends TestCase
{
    /**
     * @return array<string, array{0: ?string, 1: ZohoEnvironment}>
     */
    public static function environmentCases(): array
    {
        return [
            'production' => ['production', ZohoEnvironment::Production],
            'sandbox' => ['sandbox', ZohoEnvironment::Sandbox],
            'developer' => ['developer', ZohoEnvironment::Developer],
            '大文字・空白は正規化される' => ['  Sandbox ', ZohoEnvironment::Sandbox],
            'bigin は production 扱い' => ['bigin', ZohoEnvironment::Production],
            '未知の値は production' => ['unknown', ZohoEnvironment::Production],
            '空は production' => ['', ZohoEnvironment::Production],
            'null は production' => [null, ZohoEnvironment::Production],
        ];
    }

    #[Test]
    #[TestDox('Organizations API の type から接続環境を検証・正規化する')]
    #[DataProvider('environmentCases')]
    public function itSanitizesEnvironment(?string $type, ZohoEnvironment $expected): void
    {
        $this->assertSame($expected, Client::sanitizeEnvironment($type));
    }
}
