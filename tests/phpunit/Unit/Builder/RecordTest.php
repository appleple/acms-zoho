<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Builder;

use Acms\Plugins\Zoho\Services\Zoho\Api\RecordApi;
use Acms\Plugins\Zoho\Services\Zoho\Builder\Record as RecordBuilder;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record as RecordModel;
use Acms\TestingFramework\TestCase;
use Field;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * a-blog cms のフォーム値と拡張アプリ設定（いずれも Field）から、Zoho CRM 送信用の RecordModel を
 * 組み立てる Builder\Record の変換ロジックを固定する。
 *
 * Field は DB 非依存の in-memory コンテナなので、フォーム値・設定値を注入するだけで
 * 「フォーム → レコード」の変換・型付け・依存解決・優先モジュール確定を決定的に検証できる。
 * Zoho API を叩く経路（優先モジュール確定・ルックアップ解決の API フォールバック）は、
 * searchByUniqueKey を持つフェイクを注入してユニットの範囲に収める。
 */
final class RecordTest extends TestCase
{
    /**
     * @param array<string, array<int, string>|string> $values
     */
    private function field(array $values): Field
    {
        $field = new Field();
        foreach ($values as $key => $value) {
            $field->set($key, $value);
        }
        return $field;
    }

    /**
     * JSON エンコードを型安全に行う小さなヘルパ（設定値は JSON 文字列で保持される）。
     *
     * @param array<int|string, mixed> $data
     */
    private function json(array $data): string
    {
        $json = json_encode($data);
        self::assertIsString($json);
        return $json;
    }

    /**
     * モジュール名 => 検索ヒット時に返す配列、というマップで動くフェイクの RecordApi。
     *
     * @param array<string, array<string, string>> $responses
     */
    private function fakeRecordApi(array $responses): object
    {
        return new class ($responses) {
            /** @param array<string, array<string, string>> $responses */
            public function __construct(private array $responses)
            {
            }

            /** @return array<string, string>|null */
            public function searchByUniqueKey(string $module, string $uniqueKey, mixed $value): ?array
            {
                return $this->responses[$module] ?? null;
            }
        };
    }

    /**
     * 指定モジュール・タイプのレコードを 1 件だけ取り出す。
     *
     * @param RecordModel[] $records
     */
    private function pickRecord(array $records, string $module, string $type): RecordModel
    {
        foreach ($records as $record) {
            if ($record->getModuleApiName() === $module && $record->getType() === $type) {
                return $record;
            }
        }
        self::fail("レコードが見つかりません: {$module}/{$type}");
    }

    #[Test]
    #[TestDox('優先モジュール無し: insert スコープから insert レコードを生成し、値を型変換する')]
    public function buildsDirectInsertRecordAndNormalizesBoolean(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            // index0 は素の文字列（JSON でない）、index1 は dataType 付き JSON。
            'zoho_link_field_module_field' => ['Last_Name', $this->json(['apiName' => 'Email_Opt_In', 'dataType' => 'boolean'])],
            'zoho_link_field_cms_field' => ['name', 'optin'],
            'zoho_link_field_cms_field_fixed' => ['', ''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Leads']]), $this->json([['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1', '1'],
            'zoho_link_field_update' => ['', ''],
        ]);
        $form = $this->field(['name' => 'Yamada', 'optin' => '1']);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $records = $builder->buildRecords();

        $this->assertCount(1, $records);
        $record = $records[0];
        $this->assertSame('Leads', $record->getModuleApiName());
        $this->assertSame('insert', $record->getType());
        // insert スコープのみで update に含まれないため uniqueKey は付かない。
        $this->assertSame('', $record->getUniqueKey());
        $this->assertSame('Yamada', $record->getField('Last_Name'));
        // dataType=boolean かつ "1" は true に変換される。
        $this->assertTrue($record->getField('Email_Opt_In'));
    }

    #[Test]
    #[TestDox('優先モジュール無し: insert と update の両スコープからそれぞれのレコードを生成する')]
    public function buildsInsertAndUpdateRecords(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [$this->json([['apiName' => 'Leads'], ['apiName' => 'Contacts']])],
            'zoho_form_unique_key' => ['Email'],
            'zoho_link_field_module_field' => ['Email'],
            'zoho_link_field_cms_field' => ['email'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Leads'], ['apiName' => 'Contacts']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => ['1'],
        ]);
        $form = $this->field(['email' => 'a@example.com']);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $records = $builder->buildRecords();

        $this->assertCount(2, $records);
        $insert = $this->pickRecord($records, 'Leads', 'insert');
        $update = $this->pickRecord($records, 'Contacts', 'update');
        // Leads は insert かつ update にも含まれるので uniqueKey が付く。
        $this->assertSame('Email', $insert->getUniqueKey());
        $this->assertSame('a@example.com', $insert->getField('Email'));
        $this->assertSame('a@example.com', $update->getField('Email'));
    }

    #[Test]
    #[TestDox('優先モジュールあり: __PENDING__ の仮レコードを生成しグループ番号を保持する')]
    public function buildsPendingRecordWhenModulePriorityMatches(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Contacts']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => ['Email'],
            'zoho_link_field_module_field' => ['Email'],
            'zoho_link_field_cms_field' => ['email'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Contacts']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => [''],
        ]);
        $form = $this->field(['email' => 'a@example.com']);

        // 既定の modulePriority（['Contacts', 'Leads']）が Contacts と交差するので pending になる。
        $records = (new RecordBuilder($form, $config))->buildRecords();

        $this->assertCount(1, $records);
        $this->assertSame('__PENDING__', $records[0]->getModuleApiName());
        $this->assertSame('pending', $records[0]->getType());
        $this->assertSame(0, $records[0]->groupIndex);
        $this->assertSame('a@example.com', $records[0]->getField('Email'));
    }

    #[Test]
    #[TestDox('normalizeValue: on/true は true、off/false は false に変換する')]
    public function normalizesOnOffTrueFalse(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => ['A', 'B', 'C', 'D'],
            'zoho_link_field_cms_field' => ['a', 'b', 'c', 'd'],
            'zoho_link_field_cms_field_fixed' => ['', '', '', ''],
            'zoho_link_field_module' => array_fill(0, 4, $this->json([['apiName' => 'Leads']])),
            'zoho_link_field_insert' => ['1', '1', '1', '1'],
            'zoho_link_field_update' => ['', '', '', ''],
        ]);
        $form = $this->field(['a' => 'on', 'b' => 'off', 'c' => 'true', 'd' => 'false']);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertTrue($record->getField('A'));
        $this->assertFalse($record->getField('B'));
        $this->assertTrue($record->getField('C'));
        $this->assertFalse($record->getField('D'));
    }

    #[Test]
    #[TestDox('データ型ごとにフィールド型マーカーを立て、multiselectlookup はスキップする')]
    public function marksFieldTypesAndSkipsMultiselectLookup(): void
    {
        $types = [
            'Lookup_Field' => 'lookup',
            'Pick' => 'picklist',
            'Desc' => 'textarea',
            'Bday' => 'date',
            'When' => 'datetime',
            'Amount' => 'currency',
            'Clock' => 'time',
            'Owner' => 'ownerlookup',
            'MultiPick' => 'multiselectpicklist',
            'MultiLook' => 'multiselectlookup',
        ];
        $moduleField = [];
        $cmsField = [];
        foreach (array_keys($types) as $i => $apiName) {
            $moduleField[] = $this->json(['apiName' => $apiName, 'dataType' => $types[$apiName]]);
            $cmsField[] = 'f' . $i;
        }
        $count = count($types);
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => $moduleField,
            'zoho_link_field_cms_field' => $cmsField,
            'zoho_link_field_cms_field_fixed' => array_fill(0, $count, ''),
            'zoho_link_field_module' => array_fill(0, $count, $this->json([['apiName' => 'Leads']])),
            'zoho_link_field_insert' => array_fill(0, $count, '1'),
            'zoho_link_field_update' => array_fill(0, $count, ''),
        ]);
        $form = $this->field([
            'f0' => 'x', 'f1' => 'p', 'f2' => 'd', 'f3' => '2024-01-01', 'f4' => '2024-01-01 10:00:00',
            'f5' => '1000', 'f6' => '10:00', 'f7' => 'owner', 'f8' => ['a', 'b'], 'f9' => 'm',
        ]);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertTrue($record->isLookupField('Lookup_Field'));
        $this->assertTrue($record->isPicklistField('Pick'));
        $this->assertTrue($record->isTextareaField('Desc'));
        $this->assertTrue($record->isDateField('Bday'));
        $this->assertTrue($record->isDatetimeField('When'));
        $this->assertTrue($record->isNumberField('Amount'));
        $this->assertSame('currency', $record->getNumberFieldType('Amount'));
        $this->assertTrue($record->isTimeField('Clock'));
        $this->assertTrue($record->isUserLookupField('Owner'));
        // multiselectpicklist は配列のまま保持し、picklist としてマークする。
        $this->assertSame(['a', 'b'], $record->getField('MultiPick'));
        $this->assertTrue($record->isPicklistField('MultiPick'));
        // multiselectlookup は未対応なのでフィールドに現れない。
        $this->assertFalse($record->hasField('MultiLook'));
    }

    #[Test]
    #[TestDox('メモ（Note_Title / Note_Content）は通常フィールドではなくメモとして取り込む')]
    public function capturesNoteFieldsSeparately(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => [
                $this->json(['apiName' => 'Note_Title', 'dataType' => 'note']),
                $this->json(['apiName' => 'Note_Content', 'dataType' => 'note']),
            ],
            'zoho_link_field_cms_field' => ['title', 'body'],
            'zoho_link_field_cms_field_fixed' => ['', ''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Leads']]), $this->json([['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1', '1'],
            'zoho_link_field_update' => ['', ''],
        ]);
        $form = $this->field(['title' => 'お問い合わせ', 'body' => '本文です']);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertTrue($record->hasNote());
        $this->assertSame('お問い合わせ', $record->getNoteTitle());
        $this->assertSame('本文です', $record->getNoteContent());
        $this->assertFalse($record->hasField('Note_Title'));
        $this->assertFalse($record->hasField('Note_Content'));
    }

    #[Test]
    #[TestDox('タグは JSON 配列・カンマ区切りのどちらも解釈して設定する')]
    public function parsesTagValues(): void
    {
        $makeConfig = fn (): Field => $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => ['Tag'],
            'zoho_link_field_cms_field' => ['tags'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => [''],
        ]);

        $jsonBuilder = new RecordBuilder($this->field(['tags' => $this->json(['見込み', 'Web'])]), $makeConfig());
        $jsonBuilder->modulePriority = [];
        $this->assertSame(['見込み', 'Web'], $jsonBuilder->buildRecords()[0]->getTags());

        $csvBuilder = new RecordBuilder($this->field(['tags' => 'A, B ,C']), $makeConfig());
        $csvBuilder->modulePriority = [];
        $this->assertSame(['A', 'B', 'C'], $csvBuilder->buildRecords()[0]->getTags());
    }

    #[Test]
    #[TestDox('getDependencyMap: リレーショナル設定からモジュール依存マップを組み立てる')]
    public function buildsDependencyMap(): void
    {
        $config = $this->field([
            'zoho_related_scope' => ['Cases', 'Contacts'],
            'zoho_related_target_scope' => ['Accounts', 'Accounts'],
        ]);

        $map = (new RecordBuilder(new Field(), $config))->getDependencyMap();

        $this->assertSame(['Cases' => ['Accounts'], 'Contacts' => ['Accounts']], $map);
    }

    #[Test]
    #[TestDox('sortRecordsByDependency: 参照先モジュールを先に並べる。依存が無ければそのまま')]
    public function sortsRecordsByDependency(): void
    {
        $config = $this->field([
            'zoho_related_scope' => ['Contacts'],
            'zoho_related_target_scope' => ['Accounts'],
        ]);
        $builder = new RecordBuilder(new Field(), $config);

        $contacts = new RecordModel('Contacts', 'insert');
        $accounts = new RecordModel('Accounts', 'insert');
        $sorted = $builder->sortRecordsByDependency([$contacts, $accounts]);
        $this->assertSame([$accounts, $contacts], $sorted);

        // 依存関係が無ければ入力順のまま返す。
        $noDep = new RecordBuilder(new Field(), new Field());
        $this->assertSame([$contacts, $accounts], $noDep->sortRecordsByDependency([$contacts, $accounts]));
    }

    #[Test]
    #[TestDox('sortRecordsByDependency: 循環依存でも無限ループせず両レコードを返す')]
    public function handlesCircularDependency(): void
    {
        $config = $this->field([
            'zoho_related_scope' => ['A', 'B'],
            'zoho_related_target_scope' => ['B', 'A'],
        ]);
        $builder = new RecordBuilder(new Field(), $config);

        $a = new RecordModel('A', 'insert');
        $b = new RecordModel('B', 'insert');
        $sorted = $builder->sortRecordsByDependency([$a, $b]);

        $this->assertCount(2, $sorted);
        $this->assertContains($a, $sorted);
        $this->assertContains($b, $sorted);
    }

    #[Test]
    #[TestDox('findInProcessedRecords: モジュール・比較フィールド・値の一致で ID を返す')]
    public function findsInProcessedRecords(): void
    {
        $builder = new RecordBuilder(new Field(), new Field());
        $contact = (new RecordModel('Contacts', 'insert'))->setId('C-1')->addField('Email', 'a@example.com');
        $processed = [$contact];

        $this->assertSame('C-1', $builder->findInProcessedRecords($processed, 'Contacts', 'Email', 'a@example.com'));
        $this->assertNull($builder->findInProcessedRecords($processed, 'Contacts', 'Email', 'nobody@example.com'));
        $this->assertNull($builder->findInProcessedRecords($processed, 'Leads', 'Email', 'a@example.com'));
    }

    #[Test]
    #[TestDox('resolveLookupFields: 処理済みレコードから参照 ID を解決してルックアップ値を差し替える')]
    public function resolvesLookupFromProcessedRecords(): void
    {
        $config = $this->field([
            'zoho_related_scope' => ['Cases'],
            'zoho_related_lookup_id' => [$this->json(['apiName' => 'Contact_Id'])],
            'zoho_related_target_scope' => ['Contacts'],
            'zoho_related_compare_field' => [$this->json(['apiName' => 'Email'])],
            'zoho_related_cms_field' => ['email'],
        ]);
        $builder = new RecordBuilder(new Field(), $config);

        $case = (new RecordModel('Cases', 'insert'))->addField('Contact_Id', 'a@example.com');
        $contact = (new RecordModel('Contacts', 'insert'))->setId('C-9')->addField('Email', 'a@example.com');

        // recordApi=null でも、処理済みレコードにヒットすれば解決できる。
        $builder->resolveLookupFields($case, [$contact], null);

        $this->assertSame('C-9', $case->getField('Contact_Id'));
    }

    #[Test]
    #[TestDox('resolveLookupFields: 処理済みに無ければ Zoho API 検索で参照 ID を解決する')]
    public function resolvesLookupViaApiFallback(): void
    {
        $config = $this->field([
            'zoho_related_scope' => ['Cases'],
            'zoho_related_lookup_id' => [$this->json(['apiName' => 'Contact_Id'])],
            'zoho_related_target_scope' => ['Contacts'],
            'zoho_related_compare_field' => [$this->json(['apiName' => 'Email'])],
            'zoho_related_cms_field' => ['email'],
        ]);
        $builder = new RecordBuilder(new Field(), $config);

        $case = (new RecordModel('Cases', 'insert'))->addField('Contact_Id', 'a@example.com');

        // 処理済みレコードは空なので、API 検索（searchByUniqueKey）にフォールバックする。
        $recordApi = $this->createMock(RecordApi::class);
        $recordApi->method('searchByUniqueKey')
            ->with('Contacts', 'Email', 'a@example.com')
            ->willReturn(['id' => 'API-1']);

        $builder->resolveLookupFields($case, [], $recordApi);

        $this->assertSame('API-1', $case->getField('Contact_Id'));
    }

    #[Test]
    #[TestDox('assignModuleByPriority: 既存レコードが見つかれば update として確定する')]
    public function assignsUpdateWhenExistingRecordFound(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [$this->json([['apiName' => 'Contacts'], ['apiName' => 'Leads']])],
            'zoho_form_unique_key' => ['Email'],
            'zoho_link_field_module_field' => ['Email'],
            'zoho_link_field_cms_field' => ['email'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Contacts'], ['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => ['1'],
        ]);
        $form = $this->field(['email' => 'a@example.com']);

        $api = $this->fakeRecordApi(['Contacts' => ['id' => 'C-1']]);
        $records = (new RecordBuilder($form, $config))->buildRecords($api);

        $this->assertCount(1, $records);
        $record = $records[0];
        $this->assertSame('Contacts', $record->getModuleApiName());
        $this->assertSame('update', $record->getType());
        $this->assertSame('C-1', $record->getId());
        $this->assertSame('a@example.com', $record->getField('Email'));
    }

    #[Test]
    #[TestDox('assignModuleByPriority: どこにも無ければ insert スコープ先頭で insert する')]
    public function assignsInsertWhenNotFound(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [$this->json([['apiName' => 'Contacts']])],
            'zoho_form_unique_key' => ['Email'],
            'zoho_link_field_module_field' => ['Email'],
            'zoho_link_field_cms_field' => ['email'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Contacts'], ['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => ['1'],
        ]);
        $form = $this->field(['email' => 'a@example.com']);

        // どのモジュールでもヒットしないフェイク。
        $api = $this->fakeRecordApi([]);
        $records = (new RecordBuilder($form, $config))->buildRecords($api);

        $this->assertCount(1, $records);
        $this->assertSame('Leads', $records[0]->getModuleApiName());
        $this->assertSame('insert', $records[0]->getType());
        $this->assertNull($records[0]->getId());
    }

    #[Test]
    #[TestDox('assignModuleByPriority: 更新のみ設定で既存レコードが無い場合、insertスコープが無いので何も送信しない（__PENDING__のまま残さない）')]
    public function dropsRecordWhenUpdateOnlyAndNotFound(): void
    {
        // S3: 追加を許可するタブが無く、更新を許可するタブ（見込み客）のみ。未登録のメールで送信した場合、
        // 更新対象が見つからず、フォールバック先のinsertスコープも無いため「何も作られない」のが正しい挙動。
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [''],
            'zoho_form_update_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_unique_key' => ['Email'],
            'zoho_link_field_module_field' => ['Email'],
            'zoho_link_field_cms_field' => ['email'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Leads']])],
            'zoho_link_field_insert' => [''],
            'zoho_link_field_update' => ['1'],
        ]);
        $form = $this->field(['email' => 'notfound@example.com']);

        // どのモジュールでもヒットしないフェイク（未登録のメール）。
        $api = $this->fakeRecordApi([]);
        $records = (new RecordBuilder($form, $config))->buildRecords($api);

        $this->assertSame([], $records);
    }

    #[Test]
    #[TestDox('resolveFixedValue: %{...} が無ければ素通し、未解決のグローバル変数は空に落とす')]
    public function resolvesFixedValue(): void
    {
        $builder = new RecordBuilder(new Field(), new Field());
        // PHP 8.1 以降、Reflection は非公開メソッドへ setAccessible() 無しでアクセスできる
        // （8.5 で setAccessible() は非推奨）。
        $ref = new \ReflectionMethod($builder, 'resolveFixedValue');

        // %{...} を含まない値はそのまま返す。
        $this->assertSame('plain text', $ref->invoke($builder, 'plain text'));
        // 存在しないグローバル変数は空文字に落とす（未解決プレースホルダを残さない）。
        $this->assertSame('', $ref->invoke($builder, '%{__ZOHO_UNKNOWN_VAR__}'));
    }

    #[Test]
    #[TestDox('固定値フィールドはフォーム値ではなく設定した固定値をそのまま使う')]
    public function usesFixedValueForFixedField(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => ['Lead_Source'],
            // 固定値: cms_field 側に入れた文字列をそのまま送る（%{...} を含まなければ素通し）。
            'zoho_link_field_cms_field' => ['Web'],
            'zoho_link_field_cms_field_fixed' => ['on'],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => [''],
        ]);

        $builder = new RecordBuilder(new Field(), $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertSame('Web', $record->getField('Lead_Source'));
    }

    #[Test]
    #[TestDox('固定値で {フィールド名} を使うとフォーム値を差し込んで結合できる')]
    public function fixedValueInterpolatesFormFields(): void
    {
        $form = $this->field(['reservation_date' => '2026-07-22', 'reservation_time' => '14:00']);
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Deals']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => ['Deal_Name'],
            // 固定値テンプレ: フォームの別々の項目（日付・時刻）を差し込んで1つに結合する。
            'zoho_link_field_cms_field' => ['{reservation_date} {reservation_time}'],
            'zoho_link_field_cms_field_fixed' => ['on'],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Deals']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => [''],
        ]);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertSame('2026-07-22 14:00', $record->getField('Deal_Name'));
    }

    #[Test]
    #[TestDox('スコープ不一致・権限なしのフィールドはレコードに含めない')]
    public function skipsFieldsOutOfScopeOrWithoutPermission(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => ['Allowed', 'OtherModule', 'NoPermission'],
            'zoho_link_field_cms_field' => ['a', 'b', 'c'],
            'zoho_link_field_cms_field_fixed' => ['', '', ''],
            'zoho_link_field_module' => [
                $this->json([['apiName' => 'Leads']]),
                $this->json([['apiName' => 'Contacts']]), // Leads レコードには不一致
                $this->json([['apiName' => 'Leads']]),
            ],
            'zoho_link_field_insert' => ['1', '1', ''], // 3 番目は insert 権限なし
            'zoho_link_field_update' => ['', '', ''],
        ]);
        $form = $this->field(['a' => 'A', 'b' => 'B', 'c' => 'C']);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertSame('A', $record->getField('Allowed'));
        $this->assertFalse($record->hasField('OtherModule'));
        $this->assertFalse($record->hasField('NoPermission'));
    }

    #[Test]
    #[TestDox('リレーショナル設定のルックアップは、マッピングが無くても比較フィールド値から補う')]
    public function addsLookupFromRelatedConfig(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Cases']])],
            'zoho_form_update_scope' => [''],
            'zoho_form_unique_key' => [''],
            'zoho_link_field_module_field' => ['Subject'],
            'zoho_link_field_cms_field' => ['subject'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Cases']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => [''],
            // Cases -> Contacts のルックアップを、比較フィールド Email（CMS: email）から解決する。
            'zoho_related_scope' => ['Cases'],
            'zoho_related_lookup_id' => [$this->json(['apiName' => 'Contact_Id'])],
            'zoho_related_target_scope' => ['Contacts'],
            'zoho_related_compare_field' => [$this->json(['apiName' => 'Email'])],
            'zoho_related_cms_field' => ['email'],
        ]);
        $form = $this->field(['subject' => 'お問い合わせ', 'email' => 'a@example.com']);

        $builder = new RecordBuilder($form, $config);
        $builder->modulePriority = [];
        $record = $builder->buildRecords()[0];

        $this->assertSame('お問い合わせ', $record->getField('Subject'));
        $this->assertSame('a@example.com', $record->getField('Contact_Id'));
        $this->assertTrue($record->isLookupField('Contact_Id'));
    }

    #[Test]
    #[TestDox('assignModuleByPriority: ユニークキー値が無ければ insert スコープ先頭で insert する')]
    public function assignsInsertWhenUniqueValueEmpty(): void
    {
        $config = $this->field([
            'zoho_form_group_index' => ['1'],
            'zoho_form_insert_scope' => [$this->json([['apiName' => 'Leads']])],
            'zoho_form_update_scope' => [$this->json([['apiName' => 'Contacts']])],
            'zoho_form_unique_key' => ['Email'],
            'zoho_link_field_module_field' => ['Email'],
            'zoho_link_field_cms_field' => ['email'],
            'zoho_link_field_cms_field_fixed' => [''],
            'zoho_link_field_module' => [$this->json([['apiName' => 'Contacts'], ['apiName' => 'Leads']])],
            'zoho_link_field_insert' => ['1'],
            'zoho_link_field_update' => ['1'],
        ]);
        // email 未入力 → uniqueValue 空。
        $form = $this->field(['email' => '']);

        $api = $this->fakeRecordApi(['Contacts' => ['id' => 'C-1']]);
        $records = (new RecordBuilder($form, $config))->buildRecords($api);

        $this->assertCount(1, $records);
        $this->assertSame('Leads', $records[0]->getModuleApiName());
        $this->assertSame('insert', $records[0]->getType());
    }
}
