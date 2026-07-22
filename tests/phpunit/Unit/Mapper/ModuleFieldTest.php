<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Mapper;

use Acms\Plugins\Zoho\Services\Zoho\Mapper\ModuleField;
use Acms\TestingFramework\TestCase;
use Field;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;

/**
 * Zoho から取得したフィールド定義（連想配列）を管理画面 UI 向けの形へ整形する ModuleField を固定する。
 *
 * 入力はプレーンな連想配列（api_name / field_label / data_type / required / read_only）だけなので、
 * DB / HTTP / SDK 非依存で整形・検索・必須抽出を決定的に検証できる。設定 Field は保持されるだけ。
 */
final class ModuleFieldTest extends TestCase
{
    /**
     * @param array<int, mixed> $fields
     */
    private function mapper(array $fields): ModuleField
    {
        return new ModuleField($fields, new Field());
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function sampleFields(): array
    {
        return [
            [
                'api_name' => 'Email',
                'field_label' => 'メール',
                'data_type' => 'email',
                'required' => true,
                'read_only' => false,
                'unique' => true,
            ],
            [
                'api_name' => 'Last_Name',
                'field_label' => '姓',
                'data_type' => 'text',
                'required' => true,
            ],
            [
                'api_name' => 'Description',
                'field_label' => '説明',
                'data_type' => 'textarea',
                'required' => false,
            ],
        ];
    }

    #[Test]
    #[TestDox('toArray: apiName / fieldName に加え、存在する dataType / required / readOnly を含める')]
    public function toArrayMapsFieldsWithOptionalMetadata(): void
    {
        $result = $this->mapper($this->sampleFields())->toArray();

        $this->assertCount(3, $result);
        $this->assertSame([
            'apiName' => 'Email',
            'fieldName' => 'メール',
            'dataType' => 'email',
            'required' => true,
            'readOnly' => false,
            'unique' => true,
        ], $result[0]);
        // read_only / unique を持たない要素にはそのキーが付かない。
        $this->assertArrayNotHasKey('readOnly', $result[1]);
        $this->assertArrayNotHasKey('unique', $result[1]);
        $this->assertSame('姓', $result[1]['fieldName']);
    }

    #[Test]
    #[TestDox('toArray: 空配列は空配列を返し、配列でない要素は無視する')]
    public function toArraySkipsNonArrayEntries(): void
    {
        $this->assertSame([], $this->mapper([])->toArray());

        // 文字列など配列でない要素は結果に含めない（正常な連想配列だけを整形する）。
        $mixed = $this->mapper([
            'not-an-array',
            ['api_name' => 'Email', 'field_label' => 'メール'],
        ])->toArray();
        $this->assertSame([['apiName' => 'Email', 'fieldName' => 'メール']], $mixed);
    }

    #[Test]
    #[TestDox('isFieldExists: api_name の一致を判定する')]
    public function isFieldExistsMatchesApiName(): void
    {
        $mapper = $this->mapper($this->sampleFields());

        $this->assertTrue($mapper->isFieldExists('Email'));
        $this->assertFalse($mapper->isFieldExists('Phone'));
        $this->assertFalse($this->mapper([])->isFieldExists('Email'));
    }

    #[Test]
    #[TestDox('getRequiredFields: required === true のフィールドだけを apiName / fieldName で返す')]
    public function getRequiredFieldsReturnsOnlyRequired(): void
    {
        $required = $this->mapper($this->sampleFields())->getRequiredFields();

        $this->assertSame([
            ['apiName' => 'Email', 'fieldName' => 'メール'],
            ['apiName' => 'Last_Name', 'fieldName' => '姓'],
        ], $required);
    }
}
