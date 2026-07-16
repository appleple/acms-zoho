<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Engine;
use Acms\Plugins\Zoho\Services\Zoho\Builder\Record as RecordBuilder;
use Acms\Plugins\Zoho\Services\Zoho\Collections\RecordDependencyLevel;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record as RecordModel;
use Acms\TestingFramework\TestCase;
use Field;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;
use ReflectionMethod;

/**
 * ルックアップの参照先を先に登録するための「依存レベル計算・レベル別グループ化」を固定する。
 *
 * Engine のコンストラクタは Zoho SDK / DB を初期化するため、newInstanceWithoutConstructor で生成し、
 * 純粋な private ロジックだけを Reflection で検証する（送信 send() 本体は HTTP 依存＝実機/E2E）。
 */
final class EngineDependencyLevelTest extends TestCase
{
    private function engine(): Engine
    {
        /** @var Engine $engine */
        $engine = (new ReflectionClass(Engine::class))->newInstanceWithoutConstructor();
        return $engine;
    }

    private function invoke(object $obj, string $method, mixed ...$args): mixed
    {
        $ref = new ReflectionMethod($obj, $method);
        $ref->setAccessible(true);
        return $ref->invoke($obj, ...$args);
    }

    #[Test]
    #[TestDox('calculateModuleLevel: 依存が無ければ 0、参照先を持つほどレベルが上がる')]
    public function calculateModuleLevel(): void
    {
        $engine = $this->engine();

        // 依存なし
        $this->assertSame(0, $this->invoke($engine, 'calculateModuleLevel', 'Accounts', []));

        // Cases -> Accounts（Accounts は依存なし）
        $oneHop = ['Cases' => ['Accounts']];
        $this->assertSame(1, $this->invoke($engine, 'calculateModuleLevel', 'Cases', $oneHop));
        $this->assertSame(0, $this->invoke($engine, 'calculateModuleLevel', 'Accounts', $oneHop));

        // A -> B -> C の連鎖
        $chain = ['A' => ['B'], 'B' => ['C']];
        $this->assertSame(2, $this->invoke($engine, 'calculateModuleLevel', 'A', $chain));
        $this->assertSame(1, $this->invoke($engine, 'calculateModuleLevel', 'B', $chain));
        $this->assertSame(0, $this->invoke($engine, 'calculateModuleLevel', 'C', $chain));
    }

    #[Test]
    #[TestDox('calculateModuleLevel: 循環依存でも無限ループせず有限値を返す')]
    public function calculateModuleLevelHandlesCircular(): void
    {
        $engine = $this->engine();
        $circular = ['A' => ['B'], 'B' => ['A']];

        // 循環検出で打ち切られ、有限のレベルに収束する。
        $this->assertSame(2, $this->invoke($engine, 'calculateModuleLevel', 'A', $circular));
    }

    #[Test]
    #[TestDox('groupRecordsByDependencyLevel: 参照先(レベル0)を先に、参照元(レベル1)を後にまとめる')]
    public function groupsRecordsByDependencyLevel(): void
    {
        $engine = $this->engine();

        // Contacts -> Accounts のリレーショナル設定
        $config = new Field();
        $config->set('zoho_related_scope', ['Contacts']);
        $config->set('zoho_related_target_scope', ['Accounts']);
        $builder = new RecordBuilder(new Field(), $config);

        $contacts = new RecordModel('Contacts', 'insert');
        $accounts = new RecordModel('Accounts', 'insert');

        /** @var RecordDependencyLevel[] $levels */
        $levels = $this->invoke($engine, 'groupRecordsByDependencyLevel', $builder, [$contacts, $accounts]);

        $this->assertCount(2, $levels);
        // レベル順にソートされる: level 0 = Accounts（参照先）、level 1 = Contacts（参照元）。
        $this->assertSame(0, $levels[0]->getLevel());
        $this->assertSame([$accounts], $levels[0]->getRecords());
        $this->assertSame(1, $levels[1]->getLevel());
        $this->assertSame([$contacts], $levels[1]->getRecords());
    }
}
