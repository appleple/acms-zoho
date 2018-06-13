<?php
namespace Acms\Plugins\Zoho;

use DB;
use SQL;
use Field;
use Field_Validation;
use CristianPontes\ZohoCRMClient\ZohoCRMClient;

class Engine
{
    /**
     * Engine constructor.
     * @param string $code
     */
    public function __construct($code, $module)
    {
        $field = $this->loadFrom($code);
        if (empty($field)) {
            throw new \RuntimeException('Not Found Form.');
        }
        $this->formField = $field;
        $this->module = $module;
        $this->code = $code;
        $this->config = $field->getChild('mail');
        $this->id = $this->module->Post->get('id');
        $this->field = $this->module->Post->getChild('field');
        $this->accessToken = config('zoho_access_token');
        $this->records = array();
    }
    /**
     * @param string $code
     * @return bool|Field
     */
    protected function loadFrom($code)
    {
        $DB = DB::singleton(dsn());
        $SQL = SQL::newSelect('form');
        $SQL->addWhereOpr('form_code', $code);
        $row = $DB->query($SQL->get(dsn()), 'row');
        if (!$row) {
            return false;
        }
        $Form = new Field();
        $Form->set('code', $row['form_code']);
        $Form->set('name', $row['form_name']);
        $Form->set('scope', $row['form_scope']);
        $Form->set('log', $row['form_log']);
        $Form->overload(unserialize($row['form_data']), true);
        return $Form;
    }
    /**
     * Send
     */
    public function send()
    {
        $records = $this->makeRecords();
        $records = $this->addFieldsToRecords($records);
    }

    /**
     * make scope list
     */
    private function makeRecords()
    {
        $zohoScopeGroup = $this->config->getArray('@zoho_form_group');
        $records = array();
        foreach ($zohoScopeGroup as $i => $zohoScopeItem) {
            $insertScopes = array();
            $updateScopes = array();
            $zohoInsertScope = $this->config->get('zoho_form_insert_scope', '', $i);
            $zohoUpdateScope = $this->config->get('zoho_form_update_scope', '', $i);
            $uniqueKey = $this->config->get('zoho_form_unique_key', '', $i);
            if ($zohoInsertScopes) {
                $insertScopes = explode(',', $zohoInsertScopes);
            }
            if ($zohoUpdateScopes) {
                $updateScopes = explode(',', $zohoUpdateScopes);
            }
            if (!$uniqueKey) {
                $uniqueKey = 'Email';
            }
            foreach ($insertScopes as $insertScope) {
                $records[] = array(
                    'scope' => $insertScope,
                    'uniqueKey' => $uniqueKey,
                    'field' => array(),
                    'type' => 'insert'
                );
            }
            foreach ($updateScopes as $updateScope) {
                $records[] = array(
                    'scope' => $updateScope,
                    'uniqueKey' => $uniqueKey,
                    'field' => array(),
                    'type' => 'update'
                );
            }
        }
        return $records;
    }

    private function addFieldsToRecords($records)
    {
        $fieldKeys = $this->config->getArray('zoho_field_key');
        $attachedRecords = array();
        foreach ($fieldKeys as $i => $fieldKey) {
            $key = $this->config->get('zoho_field_cms_key', '', $i);
            $scopes = $this->config->get('zoho_field_scope', '', $i);
            $scopes = explode(',', $scopes);
            $canInsert = $this->config->get('zoho_field_insert', '', $i);
            $canUpdate = $this->config->get('zoho_field_update', '', $i);
            foreach ($scopes as $scope) {
                foreach ($records as $record) {
                    if ($record['scope'] === $scope) {
                        $newRecord = array_merge($record, array(
                            ''
                        ));
                    }
                }
            }
        }
    }
}
