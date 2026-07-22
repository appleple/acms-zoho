<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

use Field;
use Acms\Services\Facades\Common;

/**
 * Builder基底クラス
 *
 * a-blog cms から Zoho CRM へデータを送信する際の
 * データ変換・組み立てを行うBuilderクラスの基底クラス
 */
class Builder
{
    /** @var Field a-blog cms のフォーム送信データ（サブクラスのコンストラクタで設定） */
    public $field;

    /**
     * 「固定値」に設定された文字列を a-blog cms のメール差し込みパイプラインで解決する
     *
     * 本体の Common::getMailTxtFromTxt を用いて以下を解決する:
     * - グローバル変数 %{Y} など（未解決の %{...} は空文字に落ちる）
     * - フォーム値の差し込み {フィールド名}（例: `{予約日} {予約時刻}` で別々の項目を1つに結合）
     * - IF ブロック・修飾子
     *
     * ユーザー入力値に含まれる `{{ }}` はサンドボックス Twig 経由でのみ評価されるため
     * SSTI（テンプレートインジェクション）を起こさない。
     *
     * @param string $value 解決する値（設定画面の「固定値」）
     * @return string 解決後の値
     */
    protected function resolveFixedValue(string $value): string
    {
        return Common::getMailTxtFromTxt($value, $this->field);
    }

    /**
     * 文字列がJSON形式かどうかを判定
     *
     * @param string $string 判定する文字列
     * @return bool JSON形式の場合true
     */
    protected function isJson(string $string): bool
    {
        if (!(bool) $string) {
            return false;
        }
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}
