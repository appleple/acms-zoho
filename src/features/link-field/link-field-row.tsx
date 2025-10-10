import { useState, CSSProperties, useEffect } from 'react';
import { ModuleSelect } from '../components/module-select';
import { ModuleFieldSelect } from '../components/module-field-select';

interface Props {
  moduleInputRef: HTMLInputElement;
  moduleFieldInputRef: HTMLInputElement;
  moduleName: string;
  moduleValue: string;
  moduleFieldName: string;
  moduleFieldValue: string;
}

export const LinkFieldRow = ({
  moduleInputRef,
  moduleFieldInputRef,
  moduleName,
  moduleValue,
  moduleFieldName,
  moduleFieldValue,
}: Props) => {
  const [selectedModuleApiNames, setSelectedModuleApiNames] = useState<string[]>([]);

  // moduleValueが変更された時に、selectedModuleApiNamesを更新
  useEffect(() => {
    if (moduleValue) {
      try {
        const modules = JSON.parse(moduleValue);
        const apiNames = Array.isArray(modules) ? modules.map(m => m.apiName) : [];
        setSelectedModuleApiNames(apiNames);
      } catch {
        setSelectedModuleApiNames([]);
      }
    }
  }, [moduleValue]);

  return (
    <div
      className="acms-admin-cssgrid"
      style={{ '--acms-admin-columns': 2 } as CSSProperties }
    >
      <ModuleSelect
        name={moduleName}
        defaultValue={moduleValue}
        originalInputRef={moduleInputRef}
        onChange={(values) => {
          const apiNames = values.map(module => module.apiName);
          setSelectedModuleApiNames(apiNames);
        }}
      />
      <ModuleFieldSelect
        name={moduleFieldName}
        value={moduleFieldValue}
        moduleApiNames={selectedModuleApiNames}
        originalInputRef={moduleFieldInputRef}
      />
    </div>
  );
};