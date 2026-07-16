<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Tests\Unit\Api;

use Acms\Plugins\Zoho\Services\Zoho\Api\TagApi;
use Acms\TestingFramework\TestCase;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\Attributes\TestDox;
use ReflectionClass;

/**
 * タグ追加のうち、HTTP を伴わない早期ガード（タグ無しなら false）を固定する。
 *
 * 実際の追加は Zoho API 通信のため実機/E2E の領域。ここでは空配列で即 false になる分岐だけを、
 * Client を必要としない newInstanceWithoutConstructor で検証する。
 */
final class TagApiTest extends TestCase
{
    #[Test]
    #[TestDox('タグが空なら API を呼ばずに false を返す')]
    public function returnsFalseForEmptyTags(): void
    {
        /** @var TagApi $api */
        $api = (new ReflectionClass(TagApi::class))->newInstanceWithoutConstructor();

        $this->assertFalse($api->addTagsToRecord('12345', 'Leads', []));
    }
}
