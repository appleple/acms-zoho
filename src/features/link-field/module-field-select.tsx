import { useMemo } from 'react';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';
import { SimpleSelect } from '../../components/simple-select/simple-select';

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
  console.log('ModuleFieldSelectコンポーネント');

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

  return (
    <SimpleSelect
      name={name}
      className="acms-admin-form-width-full"
      defaultValue={value}
      originalInputRef={originalInputRef}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
