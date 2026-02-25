import { useState, useCallback, useEffect, useMemo } from 'react';
import { SingleValue } from 'react-select';
import RichSelect from '../rich-select/rich-select';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';
import { ModuleField } from '../../types';

interface Props {
  name: string;
  value: string;
  moduleApiNames?: string[];
  originalInputRef?: HTMLInputElement;
  onChange?: (value: string) => void;
  filterByDataType?: string;
}

// valueがJSON形式の場合はapiNameとfieldNameを取得
const parseFieldValue = (val: string): { apiName: string; fieldName: string } | null => {
  if (!val) return null;
  try {
    const parsed = JSON.parse(val);
    const apiName = parsed.apiName || val;
    const fieldName = parsed.fieldName || apiName;
    return { apiName, fieldName };
  } catch {
    // JSON parse失敗時は元の値を返す（後方互換性）
    return { apiName: val, fieldName: val };
  }
};

export const ModuleFieldSelect = ({
  name,
  value,
  moduleApiNames = [],
  originalInputRef,
  onChange,
  filterByDataType,
}: Props) => {
  const parsedValue = parseFieldValue(value);

  const { fieldsResults, isLoading } = useModuleFieldsSWR(moduleApiNames);

  const displayFields = useMemo(() => {
    if (!fieldsResults || fieldsResults.length === 0) {
      return [];
    }

    if (moduleApiNames.length === 1) {
      const firstResult = fieldsResults[0];
      return firstResult?.data || [];
    }

    const allModuleFields = fieldsResults.map(result => result.data || []);

    if (allModuleFields.length === 0 || allModuleFields.some(fields => fields.length === 0)) {
      return [];
    }

    const firstModuleFields = allModuleFields[0];

    return firstModuleFields.filter(field =>
      allModuleFields.every(moduleFields =>
        moduleFields.some(f => f.apiName === field.apiName)
      )
    );
  }, [fieldsResults, moduleApiNames]);

  const filteredFields = useMemo(() => {
    if (!filterByDataType) return displayFields;
    return displayFields.filter(field => field.dataType === filterByDataType);
  }, [displayFields, filterByDataType]);

  // 初期値がある場合は仮のオブジェクトを作成して即座に表示
  const [selected, setSelected] = useState<ModuleField | null>(() => {
    if (!parsedValue) return null;
    return {
      apiName: parsedValue.apiName,
      fieldName: parsedValue.fieldName, // 保存済みのfieldNameを使用
    };
  });

  // APIからデータが取得できたら、初期値をフルデータ（fieldName付き）に置き換える
  useEffect(() => {
    if (filteredFields.length > 0 && selected && !filteredFields.includes(selected)) {
      const fullData = filteredFields.find(f => f.apiName === selected.apiName);
      if (fullData) {
        setSelected(fullData);
      }
    }
  }, [filteredFields, selected]);

  const placeholder = moduleApiNames.length === 0
    ? 'モジュールを選択してください。'
    : '項目を選択';

  const handleChange = useCallback(
    (newValue: SingleValue<ModuleField>) => {
      setSelected(newValue);

      if (newValue && originalInputRef) {
        const fieldData = {
          apiName: newValue.apiName,
          fieldName: newValue.fieldName,
          dataType: newValue.dataType || null
        };
        originalInputRef.value = JSON.stringify(fieldData);
      } else if (!newValue && originalInputRef) {
        originalInputRef.value = '';
      }

      onChange?.(newValue?.apiName || '');
    },
    [onChange, originalInputRef]
  );

  return (
    <RichSelect<ModuleField, false>
      name={name}
      isClearable
      value={selected}
      onChange={handleChange}
      options={filteredFields}
      isLoading={isLoading}
      isDisabled={moduleApiNames.length === 0}
      getOptionLabel={(option) => option.fieldName}
      getOptionValue={(option) => option.apiName}
      placeholder={isLoading && !selected ? "更新中" : placeholder}
      loadingMessage={() => "更新中"}
      noOptionsMessage={() => "選択可能な項目がありません"}
    />
  );
};
