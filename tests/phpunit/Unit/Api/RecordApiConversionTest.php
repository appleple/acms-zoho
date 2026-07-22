<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Api;

use Acms\Plugins\Zoho\Services\Zoho\Api\RecordApi;
use Acms\Plugins\Zoho\Services\Zoho\Models\Record as RecordModel;
use Acms\TestingFramework\TestCase;
use com\zoho\crm\api\exception\SDKException;
use com\zoho\crm\api\record\APIException as ZohoAPIException;
use com\zoho\crm\api\record\SuccessResponse;
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
        // PHP 8.1 以降、Reflection は非公開メソッドへ setAccessible() 無しでアクセスできる
        // （8.5 で setAccessible() は非推奨）。
        $ref = new ReflectionMethod($obj, $method);
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

    #[Test]
    #[TestDox('createFailureFromException: 通常のExceptionはmessageのみ、SDKExceptionはcode/detailsも含める')]
    public function createFailureFromExceptionWithPlainException(): void
    {
        $api = $this->api();

        $e = new \RuntimeException('通信に失敗しました');
        $failure = $this->invoke($api, 'createFailureFromException', $e, 'Leads', 'update');

        $this->assertSame('Leads', $failure['module']);
        $this->assertSame('update', $failure['type']);
        $this->assertSame('通信に失敗しました', $failure['message']);
        $this->assertSame(\RuntimeException::class, $failure['exception']);
        $this->assertArrayNotHasKey('code', $failure);
        $this->assertArrayNotHasKey('details', $failure);
    }

    #[Test]
    #[TestDox('createFailureFromException: メッセージが空のExceptionはフォールバック文言になる')]
    public function createFailureFromExceptionWithEmptyMessage(): void
    {
        $api = $this->api();

        $e = new \RuntimeException('');
        $failure = $this->invoke($api, 'createFailureFromException', $e, 'Cases', 'create');

        $this->assertSame('エラーメッセージが取得できませんでした', $failure['message']);
    }

    #[Test]
    #[TestDox('createFailureFromException: SDKExceptionはgetMessage()が空でもgetErrorCode()/getDetails()を拾う')]
    public function createFailureFromExceptionWithSDKException(): void
    {
        $api = $this->api();

        // Zoho PHP SDK の Converter::valueChecker() が投げる TYPE ERROR はメッセージが常に空文字列。
        // 実際の原因（フィールド名・期待型・実際の型）は getErrorCode()/getDetails() にしか入らない。
        $details = [
            'field' => 'Some_Field',
            'expectedType' => 'string',
            'givenType' => 'array',
        ];
        $e = new SDKException('TYPE ERROR', '', $details, null);
        $failure = $this->invoke($api, 'createFailureFromException', $e, 'Leads', 'update');

        $this->assertSame('エラーメッセージが取得できませんでした', $failure['message']);
        $this->assertSame('TYPE ERROR', $failure['code']);
        $this->assertSame($details, $failure['details']);
    }

    #[Test]
    #[TestDox('createFailureFromException: SDKExceptionでmessageがあればそのまま使う')]
    public function createFailureFromExceptionWithSDKExceptionMessage(): void
    {
        $api = $this->api();

        $e = new SDKException('INVALID_DATA', '不正なデータです', ['field' => 'X'], null);
        $failure = $this->invoke($api, 'createFailureFromException', $e, 'Cases', 'create');

        $this->assertSame('不正なデータです', $failure['message']);
        $this->assertSame('INVALID_DATA', $failure['code']);
        $this->assertSame(['field' => 'X'], $failure['details']);
    }

    #[Test]
    #[TestDox('handleActionResponses: create成功時は succeeded にレコードが積まれ、IDが設定される')]
    public function handleActionResponsesTracksSucceededRecordsForCreate(): void
    {
        $api = $this->api();

        $record = new RecordModel('Leads', 'insert');
        $success = new SuccessResponse();
        $success->setDetails(['id' => '999']);

        $result = $this->invoke(
            $api,
            'handleActionResponses',
            [$success],
            [$record],
            'Leads',
            'create',
            ['success' => 0, 'failures' => [], 'succeeded' => []]
        );

        $this->assertSame(1, $result['success']);
        $this->assertSame([], $result['failures']);
        $this->assertCount(1, $result['succeeded']);
        $this->assertSame($record, $result['succeeded'][0]);
        $this->assertSame('999', $record->getId());
    }

    #[Test]
    #[TestDox('handleActionResponses: update成功時も succeeded に積まれる（IDは変更しない）')]
    public function handleActionResponsesTracksSucceededRecordsForUpdate(): void
    {
        $api = $this->api();

        $record = new RecordModel('Contacts', 'update');
        $record->setId('existing-id');
        $success = new SuccessResponse();

        $result = $this->invoke(
            $api,
            'handleActionResponses',
            [$success],
            [$record],
            'Contacts',
            'update',
            ['success' => 0, 'failures' => [], 'succeeded' => []]
        );

        $this->assertSame(1, $result['success']);
        $this->assertCount(1, $result['succeeded']);
        $this->assertSame('existing-id', $result['succeeded'][0]->getId());
    }

    #[Test]
    #[TestDox('handleActionResponses: 失敗したレコードは succeeded に積まれない')]
    public function handleActionResponsesExcludesFailedRecordsFromSucceeded(): void
    {
        $api = $this->api();

        $record = new RecordModel('Leads', 'insert');
        $exception = new ZohoAPIException();
        $exception->setMessage(new Choice('INVALID_DATA'));
        $exception->setCode(new Choice('INVALID_DATA'));

        $result = $this->invoke(
            $api,
            'handleActionResponses',
            [$exception],
            [$record],
            'Leads',
            'create',
            ['success' => 0, 'failures' => [], 'succeeded' => []]
        );

        $this->assertSame(0, $result['success']);
        $this->assertSame([], $result['succeeded']);
        $this->assertCount(1, $result['failures']);
    }

    #[Test]
    #[TestDox('handleActionResponses: 複数レコードでは actionResponses と records を同じ位置で対応付ける')]
    public function handleActionResponsesMapsMultipleResponsesByIndex(): void
    {
        $api = $this->api();

        // Zohoのレスポンス配列は、実際に送信したレコード配列（processRecordsの$sentRecords）と
        // 同じ順序・件数であることが前提。ここでは3件中2番目だけ失敗するケースで、
        // 各成功/失敗が正しいレコードに紐付くこと（インデックスがずれないこと）を確認する。
        $recordA = new RecordModel('Leads', 'insert');
        $recordB = new RecordModel('Leads', 'insert');
        $recordC = new RecordModel('Leads', 'insert');

        $successA = new SuccessResponse();
        $successA->setDetails(['id' => 'id-a']);

        $failureB = new ZohoAPIException();
        $failureB->setMessage(new Choice('INVALID_DATA'));
        $failureB->setCode(new Choice('INVALID_DATA'));

        $successC = new SuccessResponse();
        $successC->setDetails(['id' => 'id-c']);

        $result = $this->invoke(
            $api,
            'handleActionResponses',
            [$successA, $failureB, $successC],
            [$recordA, $recordB, $recordC],
            'Leads',
            'create',
            ['success' => 0, 'failures' => [], 'succeeded' => []]
        );

        $this->assertSame(2, $result['success']);
        $this->assertCount(2, $result['succeeded']);
        $this->assertSame($recordA, $result['succeeded'][0]);
        $this->assertSame('id-a', $recordA->getId());
        $this->assertSame($recordC, $result['succeeded'][1]);
        $this->assertSame('id-c', $recordC->getId());
        $this->assertCount(1, $result['failures']);
        $this->assertNull($recordB->getId());
    }

    #[Test]
    #[TestDox('handleActionResponses: failures の code は Choice オブジェクトではなく文字列に展開される')]
    public function handleActionResponsesExtractsChoiceValueFromCode(): void
    {
        $api = $this->api();

        $record = new RecordModel('Leads', 'insert');
        $exception = new ZohoAPIException();
        $exception->setMessage(new Choice('required field not found'));
        $exception->setCode(new Choice('MANDATORY_NOT_FOUND'));

        $result = $this->invoke(
            $api,
            'handleActionResponses',
            [$exception],
            [$record],
            'Leads',
            'create',
            ['success' => 0, 'failures' => [], 'succeeded' => []]
        );

        // Choice のまま json_encode すると非公開プロパティのため "{}" になり、ログから実際のエラーコードが失われる。
        $this->assertSame('MANDATORY_NOT_FOUND', $result['failures'][0]['code']);
    }
}
