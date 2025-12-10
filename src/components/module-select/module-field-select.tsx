import { useMemo } from 'react';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';
import { SimpleSelect } from '../simple-select/simple-select';

interface Props {
  name: string;
  value: string;
  moduleApiNames?: string[];
  originalInputRef?: HTMLInputElement;
  onChange?: (value: string) => void;
}

export const ModuleFieldSelect = ({
  name,
  value,
  moduleApiNames = [],
  originalInputRef,
  onChange
}: Props) => {
  // valueがJSON形式の場合はapiNameを取得
  const getApiNameFromValue = (val: string): string => {
    if (!val) return '';
    try {
      const parsed = JSON.parse(val);
      return parsed.apiName || val;
    } catch {
      // JSON parse失敗時は元の値を返す（後方互換性）
      return val;
    }
  };

  const apiNameValue = getApiNameFromValue(value);

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

  const options = displayFields.map(field => ({
    value: field.apiName,
    label: field.fieldName
  }));

  const placeholder = moduleApiNames.length === 0
    ? 'モジュールを選択してください。'
    : isLoading
    ? '項目を読み込み中...'
    : '項目を選択';

  const handleFieldChange = (selectedApiName: string) => {
    // 選択されたフィールドの情報を取得
    const selectedField = displayFields.find(field => field.apiName === selectedApiName);

    if (selectedField && originalInputRef) {
      // JSONオブジェクトとして保存
      const fieldData = {
        apiName: selectedField.apiName,
        dataType: selectedField.dataType || null
      };
      originalInputRef.value = JSON.stringify(fieldData);
    }

    // onChangeコールバックを実行
    if (onChange) {
      onChange(selectedApiName);
    }
  };

  return (
    <SimpleSelect
      name={name}
      className="acms-admin-form-width-full"
      defaultValue={apiNameValue}
      originalInputRef={originalInputRef}
      options={options}
      placeholder={placeholder}
      onChange={handleFieldChange}
    />
  );
};
