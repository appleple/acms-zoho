<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Services\Zoho;

/**
 * 管理者に限るハンドラが使う、{@see AdminGuard} の差し込み口。
 *
 * ハンドラはコアの CSRF・セッションに依存して直接テストしにくいため、テストでは protected のプロパティに
 * Reflection でガードを注入して、終了処理を差し替える。
 */
trait RequiresAdministrator
{
    protected ?AdminGuard $adminGuard = null;

    protected function adminGuard(): AdminGuard
    {
        return $this->adminGuard ??= new AdminGuard();
    }
}
