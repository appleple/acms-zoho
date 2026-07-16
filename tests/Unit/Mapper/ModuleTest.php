<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Mapper;

use Acms\Plugins\Zoho\Services\Zoho\Mapper\Module;
use Acms\TestingFramework\TestCase;
use com\zoho\crm\api\modules\Modules as ZohoModules;
use Field;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * Zoho SDK の Modules オブジェクト配列を管理画面 UI 向けの配列へ整形する Mapper\Module を固定する。
 *
 * Modules は HTTP を伴わない単なるデータホルダーなので、実 SDK インスタンスを組み立てて注入し、
 * 「存在判定」と「配列整形」だけを決定的に検証する。設定 Field は保持されるだけ。
 */
final class ModuleTest extends TestCase
{
    private function zohoModule(string $apiName, string $moduleName, string $singularLabel): ZohoModules
    {
        $module = new ZohoModules();
        $module->setAPIName($apiName);
        $module->setModuleName($moduleName);
        $module->setSingularLabel($singularLabel);

        return $module;
    }

    /**
     * @param array<int, mixed> $modules
     */
    private function mapper(array $modules): Module
    {
        return new Module($modules, new Field());
    }

    #[Test]
    #[TestDox('isModuleExists: 一致すれば true、無ければ false を返す')]
    public function isModuleExistsReturnsBool(): void
    {
        $mapper = $this->mapper([
            $this->zohoModule('Leads', 'リード', 'リード'),
            $this->zohoModule('Contacts', '連絡先', '連絡先'),
        ]);

        $this->assertTrue($mapper->isModuleExists('Contacts'));
        $this->assertFalse($mapper->isModuleExists('Deals'));
    }

    #[Test]
    #[TestDox('isModuleExists: モジュールが空なら false')]
    public function isModuleExistsFalseWhenEmpty(): void
    {
        $this->assertFalse($this->mapper([])->isModuleExists('Leads'));
    }

    #[Test]
    #[TestDox('toArray: moduleName / apiName / singularLabel を抽出し fields は空配列')]
    public function toArrayExtractsModuleAttributes(): void
    {
        $result = $this->mapper([
            $this->zohoModule('Leads', 'リード', 'リード'),
        ])->toArray();

        $this->assertSame([
            [
                'moduleName' => 'リード',
                'apiName' => 'Leads',
                'singularLabel' => 'リード',
                'fields' => [],
            ],
        ], $result);
    }

    #[Test]
    #[TestDox('toArray: 空配列は空配列を返し、Modules でない要素は無視する')]
    public function toArraySkipsNonModuleEntries(): void
    {
        $this->assertSame([], $this->mapper([])->toArray());

        $result = $this->mapper([
            'not-a-module',
            $this->zohoModule('Contacts', '連絡先', '連絡先'),
        ])->toArray();

        $this->assertCount(1, $result);
        $this->assertSame('Contacts', $result[0]['apiName']);
    }
}
