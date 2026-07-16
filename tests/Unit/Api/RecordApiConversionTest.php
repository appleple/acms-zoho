<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Api;

use Acms\Plugins\Zoho\Services\Zoho\Api\RecordApi;
use Acms\TestingFramework\TestCase;
use com\zoho\crm\api\util\Choice;
use DateTime;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;
use ReflectionMethod;

/**
 * a-blog cms のフォーム値を Zoho の各フィールド型へ変換する RecordApi の純粋ヘルパ群を固定する。
 *
 * これらは HTTP を伴わない値変換ロジックだが private のため、Client を必要とするコンストラクタを避けて
 * newInstanceWithoutConstructor でインスタンス化し、Reflection で直接叩く（実 API 呼び出しは実機/E2E）。
 */
final class RecordApiConversionTest extends TestCase
{
    private function api(): RecordApi
    {
        /** @var RecordApi $api */
        $api = (new ReflectionClass(RecordApi::class))->newInstanceWithoutConstructor();
        return $api;
    }

    private function invoke(object $obj, string $method, mixed ...$args): mixed
    {
        $ref = new ReflectionMethod($obj, $method);
        $ref->setAccessible(true);
        return $ref->invoke($obj, ...$args);
    }

    #[Test]
    #[TestDox('convertToDate: Y-m-d / Y/m/d を 00:00:00 の DateTime に変換し、空や不正値は null')]
    public function convertToDate(): void
    {
        $api = $this->api();

        $hyphen = $this->invoke($api, 'convertToDate', '2024-01-15');
        $this->assertInstanceOf(DateTime::class, $hyphen);
        $this->assertSame('2024-01-15 00:00:00', $hyphen->format('Y-m-d H:i:s'));

        $slash = $this->invoke($api, 'convertToDate', '2026/02/26');
        $this->assertInstanceOf(DateTime::class, $slash);
        $this->assertSame('2026-02-26 00:00:00', $slash->format('Y-m-d H:i:s'));

        // 既存の DateTime は時刻が 00:00:00 にリセットされる。
        $existing = new DateTime('2024-03-04 09:30:00');
        $reset = $this->invoke($api, 'convertToDate', $existing);
        $this->assertInstanceOf(DateTime::class, $reset);
        $this->assertSame('2024-03-04 00:00:00', $reset->format('Y-m-d H:i:s'));

        $this->assertNull($this->invoke($api, 'convertToDate', ''));
        $this->assertNull($this->invoke($api, 'convertToDate', null));
        $this->assertNull($this->invoke($api, 'convertToDate', 'not-a-date'));
    }

    #[Test]
    #[TestDox('convertToDateTime: Y-m-d H:i:s / Y-m-d を DateTime に変換し、空や不正値は null')]
    public function convertToDateTime(): void
    {
        $api = $this->api();

        $full = $this->invoke($api, 'convertToDateTime', '2024-01-15 10:30:45');
        $this->assertInstanceOf(DateTime::class, $full);
        $this->assertSame('2024-01-15 10:30:45', $full->format('Y-m-d H:i:s'));

        $dateOnly = $this->invoke($api, 'convertToDateTime', '2024-01-15');
        $this->assertInstanceOf(DateTime::class, $dateOnly);
        $this->assertSame('2024-01-15 00:00:00', $dateOnly->format('Y-m-d H:i:s'));

        $this->assertNull($this->invoke($api, 'convertToDateTime', ''));
        $this->assertNull($this->invoke($api, 'convertToDateTime', null));
        $this->assertNull($this->invoke($api, 'convertToDateTime', 'not-a-datetime'));
    }

    #[Test]
    #[TestDox('validateTimeFormat: HH:MM はそのまま、HH:MM:SS は HH:MM に切り詰め、不正値は null')]
    public function validateTimeFormat(): void
    {
        $api = $this->api();

        $this->assertSame('10:30', $this->invoke($api, 'validateTimeFormat', '10:30'));
        $this->assertSame('10:30', $this->invoke($api, 'validateTimeFormat', '10:30:45'));
        $this->assertNull($this->invoke($api, 'validateTimeFormat', ''));
        $this->assertNull($this->invoke($api, 'validateTimeFormat', null));
        $this->assertNull($this->invoke($api, 'validateTimeFormat', '9:5'));
        $this->assertNull($this->invoke($api, 'validateTimeFormat', 'time'));
    }

    #[Test]
    #[TestDox('convertToNumber: カンマ・通貨記号を除去し、型に応じて int/float、不正値は null')]
    public function convertToNumber(): void
    {
        $api = $this->api();

        $this->assertSame(1000.0, $this->invoke($api, 'convertToNumber', '1,000', 'double'));
        $this->assertSame(1234, $this->invoke($api, 'convertToNumber', '1,234', 'integer'));
        $this->assertSame(1234, $this->invoke($api, 'convertToNumber', '1,234', 'bigint'));
        // 通貨記号（\p{Sc}）を除去する。
        $this->assertSame(1000.0, $this->invoke($api, 'convertToNumber', '$1,000', 'currency'));
        $this->assertSame(3.14, $this->invoke($api, 'convertToNumber', '3.14', 'decimal'));
        // 数値型はそのまま型変換。
        $this->assertSame(5, $this->invoke($api, 'convertToNumber', 5, 'integer'));
        $this->assertSame(5.0, $this->invoke($api, 'convertToNumber', 5, 'double'));

        $this->assertNull($this->invoke($api, 'convertToNumber', '', 'double'));
        $this->assertNull($this->invoke($api, 'convertToNumber', null, 'double'));
        $this->assertNull($this->invoke($api, 'convertToNumber', 'abc', 'double'));
    }

    #[Test]
    #[TestDox('extractChoiceValue: Choice からは値を取り出し、それ以外はそのまま返す')]
    public function extractChoiceValue(): void
    {
        $api = $this->api();

        $this->assertSame('picked', $this->invoke($api, 'extractChoiceValue', new Choice('picked')));
        $this->assertSame('plain', $this->invoke($api, 'extractChoiceValue', 'plain'));
        $this->assertSame(42, $this->invoke($api, 'extractChoiceValue', 42));
    }

    #[Test]
    #[TestDox('extractRecordId: 配列/get() を持つオブジェクトから id を取り出し、無ければ null')]
    public function extractRecordId(): void
    {
        $api = $this->api();

        $this->assertSame('999', $this->invoke($api, 'extractRecordId', ['id' => '999']));
        $this->assertNull($this->invoke($api, 'extractRecordId', ['name' => 'x']));
        $this->assertNull($this->invoke($api, 'extractRecordId', 'not-an-id'));

        $obj = new class {
            public function get(string $key): ?string
            {
                return $key === 'id' ? '777' : null;
            }
        };
        $this->assertSame('777', $this->invoke($api, 'extractRecordId', $obj));
    }
}
