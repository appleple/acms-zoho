<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit;

use Acms\Plugins\Zoho\Hook;
use Acms\Services\Facades\Application;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionMethod;

/**
 * Zoho CRM への送信を、応答を返したあとに行うことと、
 * 本体が対応していないときにその場で実行する互換の動きを固定する。
 */
final class HookAfterResponseTest extends TestCase
{
    private object $realResponse;

    protected function setUp(): void
    {
        parent::setUp();
        $this->realResponse = Application::make('response');
    }

    protected function tearDown(): void
    {
        Application::instance('response', $this->realResponse);
        parent::tearDown();
    }

    private function invoke(string $method, mixed ...$args): mixed
    {
        $hook = new Hook();
        return (new ReflectionMethod($hook, $method))->invoke($hook, ...$args);
    }

    #[Test]
    #[TestDox('デバッグモードでなければ、応答を返したあとに送る')]
    public function defersWhenNotInDebugMode(): void
    {
        $this->assertTrue($this->invoke('shouldDeferRequest'));
    }

    #[Test]
    #[TestDox('本体に afterResponse() があるときは、処理を登録し、その場では実行しない')]
    public function registersTheTaskWhenTheCoreSupportsAfterResponse(): void
    {
        $recorder = new class {
            /** @var list<callable> */
            public array $tasks = [];

            public function afterResponse(callable $task): void
            {
                $this->tasks[] = $task;
            }
        };
        Application::instance('response', $recorder);
        $ran = 0;

        $this->invoke('runAfterResponse', function () use (&$ran): void {
            $ran++;
        });

        $this->assertSame(0, $ran);
        $this->assertCount(1, $recorder->tasks);
    }

    #[Test]
    #[TestDox('本体に afterResponse() が無い（古い本体）ときは、従来どおり、その場で実行する')]
    public function runsImmediatelyWhenTheCoreHasNoAfterResponse(): void
    {
        Application::instance('response', new \stdClass());
        $ran = 0;

        $this->invoke('runAfterResponse', function () use (&$ran): void {
            $ran++;
        });

        $this->assertSame(1, $ran);
    }
}
