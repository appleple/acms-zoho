<?php

namespace Acms\Plugins\Zoho\Services\Zoho;

/**
 * Builder基底クラス
 *
 * a-blog cms から Zoho CRM へデータを送信する際の
 * データ変換・組み立てを行うBuilderクラスの基底クラス
 */
class Builder
{
    /**
     * グローバル変数(%{VAR_NAME})を解決する
     *
     * 値が %{VAR_NAME} 形式のグローバル変数の場合、実際の値に置換して返す。
     * グローバル変数を含まない場合はそのまま返す。
     *
     * @param string $value 解決する値
     * @return string 解決後の値
     */
    protected function resolveGlobalVars(string $value): string
    {
        if (strpos($value, '%{') === false) {
            return $value;
        }
        $globalVars = globalVarsList();
        foreach ($globalVars as $key => $val) {
            $value = str_replace($key, (string) $val, $value);
        }
        // 未解決のグローバル変数を空文字に置換
        return preg_replace('@%\{[^}]*?\}@', '', $value);
    }

    /**
     * 文字列がJSON形式かどうかを判定
     *
     * @param string $string 判定する文字列
     * @return bool JSON形式の場合true
     */
    protected function isJson(string $string): bool
    {
        if (empty($string)) {
            return false;
        }
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }
}