import React, { useEffect, useState } from 'react';
import { useModulesSWR } from '../../hooks/use-modules-swr';

interface Props {
  name: string;
  value: string;
  relationItemId: string | null;
  onModuleChange?: (moduleApiName: string) => void;
}

export const ModuleSelect = ({ name, value, relationItemId, onModuleChange }: Props) => {
  const { modules, isLoading: isModulesLoading } = useModulesSWR();
  const [selectedModule, setSelectedModule] = useState<string>(value || '');

  useEffect(() => {
    console.log(modules);
  }, [modules]);

  useEffect(() => {
    // 初期値を設定
    setSelectedModule(value || '');
  }, [value]);

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedModule(selectedValue);

    if (onModuleChange) {
      onModuleChange(selectedValue);
    }
  };

  return (
    <select
      name={name}
      className="acms-admin-form-width-full"
      value={selectedModule}
      onChange={handleModuleChange}
      disabled={isModulesLoading}
    >
      <option value="">
        {isModulesLoading ? 'モジュールを読み込み中...' : 'モジュールを選択'}
      </option>
      {modules.map((module) => (
        <option key={module.apiName} value={module.apiName}>
          {module.moduleName}
        </option>
      ))}
    </select>
  );
};
