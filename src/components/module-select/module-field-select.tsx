import { useState, useCallback, useEffect, useMemo } from 'react';
import { SingleValue, GroupBase } from 'react-select';
import RichSelect from '../rich-select/rich-select';
import { useModuleFieldsSWR } from '../../hooks/use-module-fields-swr';
import { ModuleField } from '../../types';
import { resolveFieldSelection } from '../../utils';

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

// メモ(Note_Title/Note_Content)は通常のZoho項目ではなく本プラグインが仮想的に追加する
// 特殊項目（POST/Zoho/ModuleField.php参照）。通常項目の中に紛れると見つけにくいため、
// 別グループ・別ラベルで視認できるようにする。
const isSpecialField = (field: ModuleField): boolean => field.dataType === 'note';

const dataTypeLabel = (dataType?: string): string | undefined => {
  if (dataType === 'note') return 'メモ';
  return dataType;
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

  // APIからデータが取得できたら、初期値をフルデータ（fieldName付き）に置き換える。
  // また、タブ構成の変更で選択中の項目が全タブ共通の候補から外れた場合（例: 見込み客の
  // 「会社」は連絡先に存在しない）は、無効な値を保存し続けないよう選択をクリアする。
  useEffect(() => {
    const outcome = resolveFieldSelection(selected, filteredFields, isLoading);
    if (outcome.kind === 'upgrade') {
      setSelected(outcome.field);
    } else if (outcome.kind === 'clear') {
      setSelected(null);
      if (originalInputRef) {
        originalInputRef.value = '';
      }
      onChange?.('');
    }
  }, [filteredFields, selected, isLoading, originalInputRef, onChange]);

  // メモが候補にある場合だけ「通常のフィールド」「メモ」の2グループに分ける。
  const groupedOptions = useMemo<ModuleField[] | GroupBase<ModuleField>[]>(() => {
    const special = filteredFields.filter(isSpecialField);
    if (special.length === 0) {
      return filteredFields;
    }
    const normal = filteredFields.filter(f => !isSpecialField(f));
    return [
      { label: '通常のフィールド', options: normal },
      { label: 'メモ（レコードとは別に登録されます）', options: special },
    ];
  }, [filteredFields]);

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
      options={groupedOptions}
      isLoading={isLoading}
      isDisabled={moduleApiNames.length === 0}
      getOptionLabel={(option) => option.fieldName}
      getOptionValue={(option) => option.apiName}
      formatOptionLabel={(option, { context }) => (
        <span>
          {option.fieldName}
          {option.required && (
            <span className="acms-admin-label acms-admin-label-danger acms-admin-ms-1">必須</span>
          )}
          {option.dataType && (
            <span className="acms-admin-label acms-admin-ms-1">{dataTypeLabel(option.dataType)}</span>
          )}
          {context === 'menu' && option.unique && (
            <span className="acms-admin-label acms-admin-label-success acms-admin-ms-1">重複不可</span>
          )}
        </span>
      )}
      placeholder={isLoading && !selected ? "更新中" : placeholder}
      loadingMessage={() => "更新中"}
      noOptionsMessage={() => "選択可能な項目がありません"}
    />
  );
};
