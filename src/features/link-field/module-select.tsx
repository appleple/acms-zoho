import React, { useRef, useCallback, useEffect, useState } from 'react';
import { SelectInstance } from 'react-select';
import RichSelect from '../../components/rich-select/rich-select';
import { useModulesSWR } from '../../hooks/use-modules-swr';
import { ModuleData } from '../../types';
import { parseApiNames, stringifyApiNames } from '../../utils';

interface ModuleSelectProps
  extends Partial<
    Pick<
      React.ComponentPropsWithoutRef<typeof RichSelect>,
      'id' | 'inputId' | 'isDisabled' | 'form' | 'name' | 'menuPortalTarget'
    >
  > {
  defaultValue?: string;
  onChange?: (value: ModuleData[]) => void;
  originalInputRef?: HTMLInputElement; // 元のinput要素への参照
}

export const ModuleSelect = ({
  onChange,
  defaultValue: defaultValueProp = '',
  originalInputRef,
  ...props
}: ModuleSelectProps) => {
  const { modules, isLoading } = useModulesSWR();

  const [value, setValue] = useState<ModuleData[]>([]);
  const [currentName, setCurrentName] = useState<string>(props.name || '');

  const handleChange = useCallback(
    (newValue: readonly ModuleData[]) => {
      setValue([...newValue]);
      onChange?.([...newValue]);

      // 元のinput要素のvalueを更新
      if (originalInputRef) {
        const newApiValue = stringifyApiNames(newValue.map(module => module.apiName));
        originalInputRef.value = newApiValue;
      }
    },
    [onChange, originalInputRef]
  );

  useEffect(() => {
    if (modules && modules.length > 0 && defaultValueProp && value.length === 0) {
      // カンマ区切りの文字列をapiName配列に変換
      const apiNames = parseApiNames(defaultValueProp);
      const initialValue = modules.filter((module) => apiNames.includes(module.apiName));
      setValue(initialValue);
    }
  }, [modules, defaultValueProp, value.length, originalInputRef]);

  // name属性の動的監視（無限ループを防ぐため）
  useEffect(() => {
    if (props.name && props.name !== currentName) {
      setCurrentName(props.name);
    }
  }, [props.name, currentName]);

  const ref = useRef<SelectInstance<ModuleData, true>>(null);

  return (
    <RichSelect<ModuleData, true>
      ref={ref}
      isClearable
      value={value}
      onChange={handleChange}
      options={modules}
      isLoading={isLoading}
      getOptionLabel={(option) => option.singularLabel}
      getOptionValue={(option) => option.apiName}
      isMulti
      closeMenuOnSelect={false}
      placeholder="モジュールを選択"
      noOptionsMessage={() => "選択可能なモジュールがありません"}
      name={currentName} // acmsでnameに[{i}]が付与されるため、動的に更新されるようにする
    />
  );
};
