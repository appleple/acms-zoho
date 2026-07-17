<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Models;

use Acms\Plugins\Zoho\Services\Zoho\Models\ModuleScope;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * フォーム設定に保存されたモジュールスコープ（JSON）を ModuleScope へ復元する変換を固定する。
 *
 * 設定値は「apiName 文字列」だった時代の後方互換と、現行の連想配列 JSON の双方を受け付ける。
 * ここでは純粋な文字列 / 配列 / JSON → ModuleScope の変換だけを決定的に検証する。
 */
final class ModuleScopeTest extends TestCase
{
    #[Test]
    #[TestDox('コンストラクタは moduleName / singularLabel を省略でき、既定は空文字')]
    public function constructorDefaultsOptionalLabels(): void
    {
        $scope = new ModuleScope('Leads');

        $this->assertSame('Leads', $scope->apiName);
        $this->assertSame('', $scope->moduleName);
        $this->assertSame('', $scope->singularLabel);
    }

    #[Test]
    #[TestDox('fromArray: 文字列は apiName として扱う（後方互換）')]
    public function fromArrayAcceptsBareStringAsApiName(): void
    {
        $scope = ModuleScope::fromArray('Contacts');

        $this->assertSame('Contacts', $scope->apiName);
        $this->assertSame('', $scope->moduleName);
    }

    #[Test]
    #[TestDox('fromArray: 連想配列から apiName / moduleName / singularLabel を取り込む')]
    public function fromArrayReadsAssociativeKeys(): void
    {
        $scope = ModuleScope::fromArray([
            'apiName' => 'Leads',
            'moduleName' => 'リード',
            'singularLabel' => 'リード',
        ]);

        $this->assertSame('Leads', $scope->apiName);
        $this->assertSame('リード', $scope->moduleName);
        $this->assertSame('リード', $scope->singularLabel);
    }

    #[Test]
    #[TestDox('fromArray: 文字列でも配列でもない値は空の apiName になる')]
    public function fromArrayFallsBackToEmptyScope(): void
    {
        $scope = ModuleScope::fromArray(123);

        $this->assertSame('', $scope->apiName);
    }

    #[Test]
    #[TestDox('parseJsonArray: 空文字・不正 JSON・非配列 JSON はいずれも空配列')]
    public function parseJsonArrayReturnsEmptyForInvalidInput(): void
    {
        $this->assertSame([], ModuleScope::parseJsonArray(''));
        $this->assertSame([], ModuleScope::parseJsonArray('{invalid'));
        $this->assertSame([], ModuleScope::parseJsonArray('"just-a-string"'));
    }

    #[Test]
    #[TestDox('parseJsonArray: オブジェクト配列の JSON を ModuleScope 配列へ復元する')]
    public function parseJsonArrayHydratesScopeList(): void
    {
        $json = json_encode([
            ['apiName' => 'Contacts', 'moduleName' => '連絡先'],
            ['apiName' => 'Leads'],
        ]);
        $this->assertIsString($json);

        $scopes = ModuleScope::parseJsonArray($json);

        $this->assertCount(2, $scopes);
        $this->assertContainsOnlyInstancesOf(ModuleScope::class, $scopes);
        $this->assertSame('Contacts', $scopes[0]->apiName);
        $this->assertSame('連絡先', $scopes[0]->moduleName);
        $this->assertSame('Leads', $scopes[1]->apiName);
    }

    #[Test]
    #[TestDox('toApiNames: ModuleScope 配列から apiName だけを取り出す')]
    public function toApiNamesExtractsApiNamesInOrder(): void
    {
        $scopes = [new ModuleScope('Contacts'), new ModuleScope('Leads')];

        $this->assertSame(['Contacts', 'Leads'], ModuleScope::toApiNames($scopes));
    }
}
