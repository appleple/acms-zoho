<?php

declare(strict_types=1);

namespace Acms\Plugins\Zoho\Services\Zoho;

use Acms\Services\Session\Engine;

/**
 * OAuth の認可の開始と戻りを同じ管理者のセッションに結びつける state を、発行・照合する。
 *
 * 管理者の確認だけでは、管理者に第三者が用意した認可コード付きの URL を開かせて、
 * 攻撃者のアカウントを連携させる攻撃を防げないため、戻りで state を照合する。
 */
final class OAuthState
{
    private const SESSION_KEY = 'zoho_oauth_state';

    public function __construct(private readonly Engine $session)
    {
    }

    /**
     * state を発行してセッションに保存し、認可 URL に付ける値を返す。
     */
    public function issue(): string
    {
        $state = bin2hex(random_bytes(16));
        $this->session->set(self::SESSION_KEY, $state);
        $this->session->save();

        return $state;
    }

    /**
     * 戻ってきた state を照合する。成否にかかわらず保存した state は破棄する。
     *
     * Why not 成功したときだけ破棄しない: 失敗の後も同じ state が残ると、同じセッションで値の推測を
     * 繰り返せるため。
     *
     * @param mixed $received コールバックの state パラメータ。配列や未指定も来るため型を絞らない。
     */
    public function consume(mixed $received): bool
    {
        $expected = $this->session->get(self::SESSION_KEY);
        $this->session->delete(self::SESSION_KEY);
        $this->session->save();

        return is_string($expected)
            && $expected !== ''
            && is_string($received)
            && hash_equals($expected, $received);
    }
}
