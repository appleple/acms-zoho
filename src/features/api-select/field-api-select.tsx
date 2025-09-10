import React, { useEffect, useState } from 'react';

interface Props {
  scopeElement: HTMLSelectElement;
  fieldElement: HTMLInputElement;
  index: number;
}

interface ApiField {
  apiName: string;
  displayName: string;
}

export const FieldApiSelect = ({ scopeElement, fieldElement, index }: Props) => {
  const [fields, setFields] = useState<ApiField[]>([]);
  const [selectedScope, setSelectedScope] = useState<string>('');

  // スコープが変更されたときにフィールドリストを更新
  useEffect(() => {
    if (!scopeElement) return;

    // 初期値を設定
    setSelectedScope(scopeElement.value);

    // scopeElementのchangeイベントを監視
    const handleScopeChange = () => {
      setSelectedScope(scopeElement.value);
      // APIからフィールドを取得する（実際の実装ではAPI呼び出しを行う）
      fetchFieldsForScope(scopeElement.value);
    };

    scopeElement.addEventListener('change', handleScopeChange);

    // 初期ロード時にも一度フィールドを取得
    if (scopeElement.value) {
      fetchFieldsForScope(scopeElement.value);
    }

    return () => {
      scopeElement.removeEventListener('change', handleScopeChange);
    };
  }, [scopeElement]);

  // 選択されたスコープに基づいてフィールドを取得する関数
  const fetchFieldsForScope = async (scope: string) => {
    if (!scope || scope === '--') {
      setFields([]);
      return;
    }

    try {
      // ここで実際のAPIコールを行う
      // この例では仮のデータを使用
      // 実際の実装では、このAPIコールを実装する必要があります
      const dummyFields = [
        { apiName: 'Email', displayName: 'Email' },
        { apiName: 'FirstName', displayName: '名' },
        { apiName: 'LastName', displayName: '姓' },
      ];

      setFields(dummyFields);
    } catch (error) {
      console.error('フィールド取得エラー:', error);
      setFields([]);
    }
  };

  // フィールド選択時の処理
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 選択された値をDOMの隠れたinputに設定する処理が必要であれば実装
    if (fieldElement) {
      fieldElement.value = e.target.value;

      // カスタムイベントを発火させてDOMに変更を通知
      const event = new Event('change', { bubbles: true });
      fieldElement.dispatchEvent(event);
    }
  };

  return (
    <select
      className="acms-admin-form-width-full"
      value={fieldElement?.value || ''}
      onChange={handleFieldChange}
      disabled={!selectedScope || selectedScope === '--'}
    >
      <option value="">選択してください</option>
      {fields.map((field) => (
        <option key={field.apiName} value={field.apiName}>
          {field.displayName}
        </option>
      ))}
    </select>
  );
};