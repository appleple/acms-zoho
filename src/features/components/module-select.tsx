import React, { useRef, useCallback, useEffect, useState } from 'react';
import { SelectInstance } from 'react-select';
import RichSelect from '../../components/rich-select/rich-select';
import { useModulesSWR } from '../../hooks/use-modules-swr';
import { Module, ModuleWithFields } from '../../types';

interface ModuleSelectProps
  extends Partial<
    Pick<
      React.ComponentPropsWithoutRef<typeof RichSelect>,
      'id' | 'inputId' | 'isDisabled' | 'form' | 'name' | 'menuPortalTarget'
    >
  > {
  defaultValue?: string;
  onChange?: (value: ModuleWithFields[]) => void;
  originalInputRef?: HTMLInputElement; // 元のinput要素への参照
}

export const ModuleSelect = ({
  onChange,
  defaultValue: defaultValueProp = '',
  originalInputRef,
  ...props
}: ModuleSelectProps) => {
  const { modules, isLoading } = useModulesSWR();

  const [value, setValue] = useState<ModuleWithFields[]>([]);
  const [currentName, setCurrentName] = useState<string>(props.name || '');

  const handleChange = useCallback(
    (newValue: readonly ModuleWithFields[]) => {
      setValue([...newValue]);
      onChange?.([...newValue]);

      // 元のinput要素のvalueを更新
      if (originalInputRef) {
        const modules: Module[] = newValue.map(module => ({
          apiName: module.apiName,
          moduleName: module.moduleName,
          singularLabel: module.singularLabel,
        }));
        originalInputRef.value = JSON.stringify(modules);
      }
    },
    [onChange, originalInputRef]
  );

  useEffect(() => {
    if (modules && modules.length > 0 && defaultValueProp && value.length === 0) {
      // JSON配列文字列をModule配列に変換
      try {
        const parsedModules: Module[] = JSON.parse(defaultValueProp);
        const apiNames = parsedModules.map(m => m.apiName);
        const initialValue = modules.filter((module) => apiNames.includes(module.apiName));
        setValue(initialValue);
      } catch {
        // パースエラーの場合は空配列として扱う
      }
    }
  }, [modules, defaultValueProp, value.length, originalInputRef]);

  // name属性の動的監視（無限ループを防ぐため）
  useEffect(() => {
    if (props.name && props.name !== currentName) {
      setCurrentName(props.name);
    }
  }, [props.name, currentName]);

  const ref = useRef<SelectInstance<ModuleWithFields, true>>(null);

  return (
    <RichSelect<ModuleWithFields, true>
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
