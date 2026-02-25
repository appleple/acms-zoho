import { useState, useCallback, useEffect } from 'react';
import { SingleValue } from 'react-select';
import RichSelect from '../rich-select/rich-select';
import { useModulesSWR } from '../../hooks/use-modules-swr';
import { ModuleWithFields } from '../../types';

interface ModuleSingleSelectProps {
  name: string;
  defaultValue?: string;
  originalInputRef?: HTMLInputElement;
  onChange?: (apiName: string) => void;
  placeholder?: string;
}

export const ModuleSingleSelect = ({
  name,
  defaultValue = '',
  originalInputRef,
  onChange,
  placeholder,
}: ModuleSingleSelectProps) => {
  const { modules, isLoading } = useModulesSWR();

  // 初期値がある場合は仮のオブジェクトを作成して即座に表示
  const [value, setValue] = useState<ModuleWithFields | null>(() => {
    if (!defaultValue) return null;
    return {
      apiName: defaultValue,
      moduleName: '',
      singularLabel: defaultValue,
    };
  });

  // APIからデータが取得できたら、初期値をフルデータに置き換える
  useEffect(() => {
    if (modules && modules.length > 0 && value && !modules.includes(value)) {
      const fullData = modules.find(m => m.apiName === value.apiName);
      if (fullData) {
        setValue(fullData);
      }
    }
  }, [modules, value]);

  const handleChange = useCallback(
    (newValue: SingleValue<ModuleWithFields>) => {
      setValue(newValue);
      const apiName = newValue?.apiName || '';

      if (originalInputRef) {
        originalInputRef.value = apiName;
      }
      onChange?.(apiName);
    },
    [onChange, originalInputRef]
  );

  const displayPlaceholder = placeholder || 'タブを選択';

  return (
    <RichSelect<ModuleWithFields, false>
      name={name}
      isClearable
      value={value}
      onChange={handleChange}
      options={modules}
      isLoading={isLoading}
      getOptionLabel={(option) => option.singularLabel}
      getOptionValue={(option) => option.apiName}
      placeholder={isLoading && !value ? "更新中" : displayPlaceholder}
      loadingMessage={() => "更新中"}
      noOptionsMessage={() => "選択可能なタブがありません"}
    />
  );
};
