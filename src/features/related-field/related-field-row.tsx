import { useState, CSSProperties } from 'react';
import { ModuleSingleSelect } from '../../components/module-select/module-single-select';
import { ModuleFieldSelect } from '../../components/module-select/module-field-select';

interface Props {
  scopeInputRef: HTMLInputElement;
  scopeValue: string;
  lookupIdInputRef: HTMLInputElement;
  lookupIdValue: string;
  targetScopeInputRef: HTMLInputElement;
  targetScopeValue: string;
  compareFieldInputRef: HTMLInputElement;
  compareFieldValue: string;
}

export const RelatedFieldRow = ({
  scopeInputRef,
  scopeValue,
  lookupIdInputRef,
  lookupIdValue,
  targetScopeInputRef,
  targetScopeValue,
  compareFieldInputRef,
  compareFieldValue,
}: Props) => {
  const [selectedScopeApiName, setSelectedScopeApiName] = useState(scopeValue);
  const [selectedTargetScopeApiName, setSelectedTargetScopeApiName] = useState(targetScopeValue);
  const [currentLookupIdValue, setCurrentLookupIdValue] = useState(lookupIdValue);
  const [currentCompareFieldValue, setCurrentCompareFieldValue] = useState(compareFieldValue);

  const handleScopeChange = (apiName: string) => {
    setSelectedScopeApiName(apiName);
    // 関連元タブ変更時にルックアップIDをリセット
    setCurrentLookupIdValue('');
    lookupIdInputRef.value = '';
  };

  const handleTargetScopeChange = (apiName: string) => {
    setSelectedTargetScopeApiName(apiName);
    // 関連先タブ変更時に比較フィールドをリセット
    setCurrentCompareFieldValue('');
    compareFieldInputRef.value = '';
  };

  return (
    <div
      className="acms-admin-cssgrid"
      style={{ '--acms-admin-columns': 4 } as CSSProperties}
    >
      <ModuleSingleSelect
        name={scopeInputRef.getAttribute('name') || ''}
        defaultValue={scopeValue}
        originalInputRef={scopeInputRef}
        onChange={handleScopeChange}
        placeholder="関連元タブを選択"
      />
      <ModuleFieldSelect
        key={`lookup-${selectedScopeApiName}`}
        name={lookupIdInputRef.getAttribute('name') || ''}
        value={currentLookupIdValue}
        moduleApiNames={selectedScopeApiName ? [selectedScopeApiName] : []}
        originalInputRef={lookupIdInputRef}
        filterByDataType="lookup"
      />
      <ModuleSingleSelect
        name={targetScopeInputRef.getAttribute('name') || ''}
        defaultValue={targetScopeValue}
        originalInputRef={targetScopeInputRef}
        onChange={handleTargetScopeChange}
        placeholder="関連先タブを選択"
      />
      <ModuleFieldSelect
        key={`compare-${selectedTargetScopeApiName}`}
        name={compareFieldInputRef.getAttribute('name') || ''}
        value={currentCompareFieldValue}
        moduleApiNames={selectedTargetScopeApiName ? [selectedTargetScopeApiName] : []}
        originalInputRef={compareFieldInputRef}
      />
    </div>
  );
};
