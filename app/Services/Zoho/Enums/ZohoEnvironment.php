<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Enums;

/**
 * Zoho CRM の接続環境（config: zoho_environment）。
 *
 * Organizations API（GET /crm/v8/org）が返す type フィールドの値と対応する
 * （bigin 等それ以外の値は Client::sanitizeEnvironment() で Production にフォールバックする）。
 */
enum ZohoEnvironment: string
{
    case Production = 'production';
    case Sandbox = 'sandbox';
    case Developer = 'developer';
}
