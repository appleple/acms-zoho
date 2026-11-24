<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Services\Facades\Common;
use Acms\Services\Facades\Logger;
use Closure;

/**
 * 設定画面から呼ばれる処理（認可の開始・解除・コールバック・モジュール情報の取得など）を、管理者に限る。
 *
 * 管理者の判定と終了処理を差し替えられるのは、既定の終了（die・JSON 応答後の終了）が、
 * テストのプロセスごと止めてしまうため。
 */
final class AdminGuard
{
    /** @var Closure(): bool */
    private Closure $isAdministrator;

    /** @var Closure(bool): never */
    private Closure $terminate;

    /**
     * @param (Closure(): bool)|null $isAdministrator 省略時は、ログイン中のユーザーが現在のブログの管理者か
     * @param (Closure(bool): never)|null $terminate 受け取った値が true なら JSON で、false ならそのまま、処理を終える。省略時は実際に終了する
     */
    public function __construct(?Closure $isAdministrator = null, ?Closure $terminate = null)
    {
        $this->isAdministrator = $isAdministrator ?? static fn (): bool => sessionWithAdministration();
        $this->terminate = $terminate ?? static function (bool $json): never {
            if ($json) {
                Common::responseJson(['error' => 'Forbidden']);
            }
            exit;
        };
    }

    /**
     * 管理者でなければ、記録して 403 を返し、処理を終える。
     *
     * Why not 例外で終わらせない: 呼び出し元（コアの POST / GET の処理）が例外をどう扱うかは保証されず、
     * これまでの die と応答が変わりうるため、終了の仕方だけを差し替えられるようにした。
     *
     * @param string $module 記録に残す呼び出し元のクラス名
     * @param bool $json JSON で応答するモジュールか
     */
    public function enforce(string $module, bool $json = false): void
    {
        if (($this->isAdministrator)()) {
            return;
        }

        Logger::notice('【Zoho plugin】管理者以外からの要求のため、処理を中断しました。', ['module' => $module]);
        http_response_code(403);
        ($this->terminate)($json);
    }
}
