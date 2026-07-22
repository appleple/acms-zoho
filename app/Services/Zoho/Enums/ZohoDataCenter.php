<?php

namespace Acms\Plugins\Zoho\Services\Zoho\Enums;

/**
 * Zoho CRM のデータセンター（Multi-DC、config: zoho_data_center）。
 *
 * OAuth コールバックの location パラメータの値と対応する。
 */
enum ZohoDataCenter: string
{
    case US = 'us';
    case EU = 'eu';
    case IN = 'in';
    case CN = 'cn';
    case AU = 'au';
    case JP = 'jp';
    case CA = 'ca';
    case SA = 'sa';
}
