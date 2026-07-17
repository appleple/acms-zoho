<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Models;

use Acms\Plugins\Zoho\Services\Zoho\Models\Record;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * Zoho CRM へ送信する 1 レコードを表す DTO の振る舞いを固定する。
 *
 * 純粋な値オブジェクト（DB / HTTP / Zoho SDK 非依存）なので、コンストラクタと各種
 * setter/getter・型マーカー・メモ/タグ・fromArray の変換だけを決定的に検証する。
 */
final class RecordTest extends TestCase
{
    #[Test]
    #[TestDox('コンストラクタでモジュール名・タイプ・ユニークキーを保持し、ID は既定 null')]
    public function constructorKeepsCoreAttributes(): void
    {
        $record = new Record('Leads', 'insert', 'Email');

        $this->assertSame('Leads', $record->getModuleApiName());
        $this->assertSame('insert', $record->getType());
        $this->assertSame('Email', $record->getUniqueKey());
        $this->assertNull($record->getId());
    }

    #[Test]
    #[TestDox('ユニークキーは省略時に空文字')]
    public function uniqueKeyDefaultsToEmpty(): void
    {
        $this->assertSame('', (new Record('Leads', 'insert'))->getUniqueKey());
    }

    #[Test]
    #[TestDox('モジュール名・タイプ・ID の setter は self を返し値を差し替える')]
    public function settersAreFluentAndMutateState(): void
    {
        $record = new Record('__PENDING__', 'pending');

        $this->assertSame($record, $record->setModuleApiName('Contacts'));
        $this->assertSame($record, $record->setType('update'));
        $this->assertSame($record, $record->setId('12345'));

        $this->assertSame('Contacts', $record->getModuleApiName());
        $this->assertSame('update', $record->getType());
        $this->assertSame('12345', $record->getId());
    }

    #[Test]
    #[TestDox('フィールドの追加・一括追加・取得・存在確認・既定値・削除')]
    public function fieldCrudBehavesAsExpected(): void
    {
        $record = new Record('Leads', 'insert');

        $record->addField('Last_Name', 'Yamada');
        $record->addFields(['Email' => 'a@example.com', 'Company' => 'appleple']);

        $this->assertTrue($record->hasField('Email'));
        $this->assertFalse($record->hasField('Phone'));
        $this->assertSame('Yamada', $record->getField('Last_Name'));
        $this->assertSame('fallback', $record->getField('Phone', 'fallback'));
        $this->assertNull($record->getField('Phone'));
        $this->assertSame(
            ['Last_Name' => 'Yamada', 'Email' => 'a@example.com', 'Company' => 'appleple'],
            $record->getFields()
        );

        $record->removeField('Company');
        $this->assertFalse($record->hasField('Company'));
    }

    #[Test]
    #[TestDox('各フィールド型のマーカーは立てた種別だけ真になる')]
    public function fieldTypeMarkersAreIndependent(): void
    {
        $record = new Record('Leads', 'insert');

        $record->markAsLookupField('Contact_Name');
        $record->markAsPicklistField('Lead_Status');
        $record->markAsTextareaField('Description');
        $record->markAsDateField('Birthday');
        $record->markAsDatetimeField('Follow_Up');
        $record->markAsTimeField('Preferred_Time');
        $record->markAsMultiselectlookupField('Related');
        $record->markAsUserLookupField('Owner');

        $this->assertTrue($record->isLookupField('Contact_Name'));
        $this->assertTrue($record->isPicklistField('Lead_Status'));
        $this->assertTrue($record->isTextareaField('Description'));
        $this->assertTrue($record->isDateField('Birthday'));
        $this->assertTrue($record->isDatetimeField('Follow_Up'));
        $this->assertTrue($record->isTimeField('Preferred_Time'));
        $this->assertTrue($record->isMultiselectlookupField('Related'));
        $this->assertTrue($record->isUserLookupField('Owner'));

        // 立てていないフィールドは全種別で偽。
        $this->assertFalseForAllMarkers($record, 'Unmarked');
    }

    #[Test]
    #[TestDox('数値フィールドは型名を保持し、既定は double')]
    public function numberFieldRemembersItsType(): void
    {
        $record = new Record('Leads', 'insert');

        $record->markAsNumberField('Annual_Revenue', 'currency');
        $record->markAsNumberField('Score');

        $this->assertTrue($record->isNumberField('Annual_Revenue'));
        $this->assertSame('currency', $record->getNumberFieldType('Annual_Revenue'));
        $this->assertSame('double', $record->getNumberFieldType('Score'));
        $this->assertNull($record->getNumberFieldType('Unknown'));
    }

    #[Test]
    #[TestDox('メモは本文が非空なら hasNote が真（タイトルは任意）')]
    public function noteIsPresentWhenContentIsNotEmpty(): void
    {
        $record = new Record('Leads', 'insert');
        $this->assertFalse($record->hasNote());

        $record->setNoteTitle('タイトル');
        $this->assertFalse($record->hasNote(), 'タイトルだけではメモとして扱わない');

        $record->setNoteContent('本文');
        $this->assertTrue($record->hasNote());
        $this->assertSame('タイトル', $record->getNoteTitle());
        $this->assertSame('本文', $record->getNoteContent());
    }

    #[Test]
    #[TestDox('タグは設定された配列を保持し、非空なら hasTags が真')]
    public function tagsArePreserved(): void
    {
        $record = new Record('Leads', 'insert');
        $this->assertFalse($record->hasTags());
        $this->assertSame([], $record->getTags());

        $record->setTags(['見込み', 'Web']);
        $this->assertTrue($record->hasTags());
        $this->assertSame(['見込み', 'Web'], $record->getTags());
    }

    #[Test]
    #[TestDox('fromArray: moduleApiName・type・uniqueKey・field・id を取り込む')]
    public function fromArrayHydratesFullPayload(): void
    {
        $record = Record::fromArray([
            'moduleApiName' => 'Contacts',
            'type' => 'update',
            'uniqueKey' => 'Email',
            'field' => ['Email' => 'a@example.com', 'Last_Name' => 'Sato'],
            'id' => '999',
        ]);

        $this->assertSame('Contacts', $record->getModuleApiName());
        $this->assertSame('update', $record->getType());
        $this->assertSame('Email', $record->getUniqueKey());
        $this->assertSame('999', $record->getId());
        $this->assertSame(['Email' => 'a@example.com', 'Last_Name' => 'Sato'], $record->getFields());
    }

    #[Test]
    #[TestDox('fromArray: moduleApiName が無ければ後方互換の scope を使う')]
    public function fromArrayFallsBackToScope(): void
    {
        $record = Record::fromArray(['scope' => 'Leads', 'type' => 'insert']);

        $this->assertSame('Leads', $record->getModuleApiName());
        $this->assertSame('insert', $record->getType());
        $this->assertSame('', $record->getUniqueKey());
        $this->assertNull($record->getId());
        $this->assertSame([], $record->getFields());
    }

    /**
     * 指定フィールドがどの型マーカーにも該当しないことを一括検証する。
     */
    private function assertFalseForAllMarkers(Record $record, string $fieldName): void
    {
        $this->assertFalse($record->isLookupField($fieldName));
        $this->assertFalse($record->isPicklistField($fieldName));
        $this->assertFalse($record->isTextareaField($fieldName));
        $this->assertFalse($record->isDateField($fieldName));
        $this->assertFalse($record->isDatetimeField($fieldName));
        $this->assertFalse($record->isTimeField($fieldName));
        $this->assertFalse($record->isNumberField($fieldName));
        $this->assertFalse($record->isMultiselectlookupField($fieldName));
        $this->assertFalse($record->isUserLookupField($fieldName));
    }
}
