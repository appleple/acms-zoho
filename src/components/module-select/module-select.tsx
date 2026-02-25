import React, { useRef, useCallback, useEffect, useState } from 'react';
import { SelectInstance } from 'react-select';
import RichSelect from '../rich-select/rich-select';
import { useModulesSWR } from '../../hooks/use-modules-swr';
import { Module, ModuleWithFields } from '../../types';
import { parseModulesJson } from '../../utils';

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

  // 初期値がある場合はパースして最初から表示する
  const [value, setValue] = useState<ModuleWithFields[]>(() => parseModulesJson(defaultValueProp));
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

  // APIからデータが取得できたら、初期値をフルデータ（fields付き）に置き換える
  useEffect(() => {
    if (modules && modules.length > 0 && value.length > 0) {
      const needsUpdate = value.some(v => !modules.includes(v));
      if (needsUpdate) {
        const apiNames = value.map(v => v.apiName);
        const fullDataValues = modules.filter((module) => apiNames.includes(module.apiName));
        if (fullDataValues.length > 0) {
          setValue(fullDataValues);
        }
      }
    }
  }, [modules, value]);

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
      placeholder={isLoading ? "更新中" : "モジュールを選択"}
      loadingMessage={() => "更新中"}
      noOptionsMessage={() => "選択可能なモジュールがありません"}
      name={currentName} // acmsでnameに[{i}]が付与されるため、動的に更新されるようにする
    />
  );
};
