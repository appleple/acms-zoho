<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Collections;

use Acms\Plugins\Zoho\Services\Zoho\Collections\RecordDependencyLevel;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * 同一依存レベルのレコードをまとめる単純なコレクションの振る舞いを固定する。
 */
final class RecordDependencyLevelTest extends TestCase
{
    #[Test]
    #[TestDox('生成直後のレコードは空で、依存レベルを保持する')]
    public function startsEmpty(): void
    {
        $level = new RecordDependencyLevel(2);

        $this->assertSame(2, $level->getLevel());
        $this->assertSame([], $level->getRecords());
    }

    #[Test]
    #[TestDox('addRecord は self を返し、追加順を保ったまま蓄積する')]
    public function addRecordIsFluentAndPreservesOrder(): void
    {
        $level = new RecordDependencyLevel(1);
        $first = new Record('Accounts', 'insert');
        $second = new Record('Contacts', 'insert');

        $this->assertSame($level, $level->addRecord($first));
        $level->addRecord($second);

        $this->assertSame([$first, $second], $level->getRecords());
    }
}
