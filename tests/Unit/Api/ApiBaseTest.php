<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Api;

use Acms\Plugins\Zoho\Services\Zoho\Api\RecordApi;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;
use ReflectionMethod;

/**
 * ラベル名 → API 名の解決を担う ApiBase の振る舞いを固定する。
 *
 * ApiBase は抽象クラスなので具象サブクラス（RecordApi）を Client 無しで生成し（newInstanceWithoutConstructor）、
 * 公開 API の setLabelToApiNameMap でマップを注入して、protected の getApiNameByLabelName を Reflection で検証する。
 */
final class ApiBaseTest extends TestCase
{
    /**
     * @param array<int, array<string, mixed>> $map
     */
    private function apiWithMap(array $map): RecordApi
    {
        /** @var RecordApi $api */
        $api = (new ReflectionClass(RecordApi::class))->newInstanceWithoutConstructor();
        $api->setLabelToApiNameMap($map);
        return $api;
    }

    private function resolve(RecordApi $api, string $label, string $module): mixed
    {
        // PHP 8.1 以降、Reflection は非公開メソッドへ setAccessible() 無しでアクセスできる
        // （8.5 で setAccessible() は非推奨）。
        $ref = new ReflectionMethod($api, 'getApiNameByLabelName');
        return $ref->invoke($api, $label, $module);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function sampleMap(): array
    {
        return [
            ['moduleName' => 'Leads', 'map' => ['メール' => 'Email', '姓' => 'Last_Name']],
            ['moduleName' => 'Contacts', 'map' => ['電話' => 'Phone']],
        ];
    }

    #[Test]
    #[TestDox('マップが空ならラベル名をそのまま返す')]
    public function returnsLabelWhenMapEmpty(): void
    {
        $this->assertSame('メール', $this->resolve($this->apiWithMap([]), 'メール', 'Leads'));
    }

    #[Test]
    #[TestDox('モジュールとラベルが一致すれば対応する API 名を返す')]
    public function resolvesApiNameForMatchingModuleAndLabel(): void
    {
        $api = $this->apiWithMap($this->sampleMap());

        $this->assertSame('Email', $this->resolve($api, 'メール', 'Leads'));
        $this->assertSame('Last_Name', $this->resolve($api, '姓', 'Leads'));
        $this->assertSame('Phone', $this->resolve($api, '電話', 'Contacts'));
    }

    #[Test]
    #[TestDox('モジュールは一致するがラベルが無い場合は空文字を返す')]
    public function returnsEmptyWhenLabelMissingInModule(): void
    {
        $this->assertSame('', $this->resolve($this->apiWithMap($this->sampleMap()), '住所', 'Leads'));
    }

    #[Test]
    #[TestDox('モジュールが一致しない場合は空文字を返す')]
    public function returnsEmptyWhenModuleNotFound(): void
    {
        $this->assertSame('', $this->resolve($this->apiWithMap($this->sampleMap()), 'メール', 'Deals'));
    }

    #[Test]
    #[TestDox('setLabelToApiNameMap は self を返す（フルーエント）')]
    public function setLabelToApiNameMapIsFluent(): void
    {
        /** @var RecordApi $api */
        $api = (new ReflectionClass(RecordApi::class))->newInstanceWithoutConstructor();
        $this->assertSame($api, $api->setLabelToApiNameMap([]));
    }
}
