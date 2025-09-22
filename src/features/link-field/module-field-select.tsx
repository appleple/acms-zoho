import React, { useEffect, useState } from 'react';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';

interface Props {
  name: string;
  value: string;
  moduleApiName: string | null;
}

export const ModuleFieldSelect = ({ name, value, moduleApiName }: Props) => {
  const [selectedItem, setSelectedItem] = useState<string>(value || '');
  const { fields, isLoading } = useModuleFieldsSWR(moduleApiName);

  useEffect(() => {
    setSelectedItem(value || '');
  }, [value]);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedItem(selectedValue);
  };

  return (
    <select
      name={name}
      className="acms-admin-form-width-full"
      value={selectedItem}
      onChange={handleItemChange}
    >
      <option value="">
        {isLoading ? '項目を読み込み中...' : '項目を選択'}
      </option>
      {fields.map((item) => (
        <option key={item.apiName} value={item.apiName}>
          {item.fieldName}
        </option>
      ))}
    </select>
  );
};
