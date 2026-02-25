<?php

namespace Acms\Plugins\Zoho\Models;

class Module
{
    protected $moduleName = '';

    protected $apiName = '';

    protected $fields = [];

    public function initialize($apiName = '', $moduleName = '', $fields = [])
    {
        $this->apiName = $apiName;
        $this->moduleName = $moduleName;
        $this->fields = $fields;
    }

    public function getApiName()
    {
        return $this->apiName;
    }

    public function getModuleName()
    {
        return $this->moduleName;
    }

    public function getFields()
    {
        return $this->fields;
    }

    public function setApiName($apiName)
    {
        $this->apiName = $apiName;
    }

    public function setModuleName($moduleName)
    {
        $this->moduleName = $moduleName;
    }

    public function setFields($fields)
    {
        $this->fields = $fields;
    }
}
