<?php

namespace ACMS\Plugins\Zoho\GET\Zoho;

use ACMS_GET;
use Template;
use ACMS_Corrector;
use CristianPontes\ZohoCRMClient\ZohoCRMClient;

class Records extends ACMS_GET
{
    function get()
    {
        $Tpl = new Template($this->tpl, new ACMS_Corrector());
        $queries = array();
        parse_str(QUERY, $queries);
        $accessToken = config('zoho_access_token');
        $scopeKey = config('zoho_key_scope');
        $maps = configArray('zoho_key_map_param');
        $options = array();
        $scope = '';
        foreach ($queries as $query => $value) {
            foreach ($params as $i => $param) {
                $key = config('zoho_key_map_zoho', '', $i);
                if ($query === $param) {
                    $options[$key] = $value;
                }
            }
            if ($query === $scopeKey) {
                $scope = $value;
            }
        }
        $client = new ZohoCRMClient($scope, $accessToken);
        foreach ($options as $key => $value) {
            $client->where($key, $value);
        }
        $results = $client->request();
    }
}
