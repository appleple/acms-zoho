<?php

namespace Acms\Plugins\Zoho\GET;

use ACMS_GET;
use Field;

class Zoho extends ACMS_GET
{
    /**
     * エラーをセッションに登録するヘルパーメソッド
     *
     * ACMS_POST::addError() と同じ形式でセッションの errors チャイルドに積むことで、
     * 標準の Admin_Errors モジュールがそのまま拾って表示する。
     *
     * @param string $detail エラーの詳細（例外メッセージなど）
     */
    protected function addError(string $detail = '')
    {
        $errors = new Field();
        $errors->addField('error', '【Zoho plugin】' . $detail);

        $session =& Field::singleton('session');
        $session->addChild('errors', $errors);
    }
}
