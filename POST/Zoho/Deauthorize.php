<?php
namespace Acms\Plugins\Zoho\POST\Zoho;

use ACMS_POST;
use Cache;
use DB;
use SQL;
class Deauthorize extends ACMS_POST
{
    public function post()
    {
        if (class_exists('Cache')) {
            Cache::flush('config');
        }

        $DB = DB::singleton(dsn());
        $RemoveSQL = SQL::newDelete('config');
        $RemoveSQL->addWhereOpr('config_blog_id', BID);
        $RemoveSQL->addWhereOpr('config_key', 'zoho_refresh_token');
        $DB->query($RemoveSQL->get(dsn()), 'exec');

        $this->redirect(acmsLink(array(
            'bid' => BID,
            'admin' => 'app_zoho_index',
        )));
    }
}
