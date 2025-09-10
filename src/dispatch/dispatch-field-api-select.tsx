import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FieldApiSelect } from '../features/api-select/field-api-select';

export default function ApiSelect() {
  const [fieldRows, setFieldRows] = useState<Element[]>([]);

  useEffect(() => {
    // js-zoho-field クラスを持つ行を取得
    const zohoFieldList = document.querySelectorAll('.js-zoho-field');
    setFieldRows(Array.from(zohoFieldList));

    // 各行にReactコンポーネントをマウント
    zohoFieldList.forEach((row, index) => {
      mountFieldApiSelect(row, index);
    });

    // acmsAddCustomFieldGroup イベントをリッスンして新しい行が追加されたときにマウント
    if (window.ACMS && window.ACMS.addListener) {
      console.log('acmsAddCustomFieldGroup');
      window.ACMS.addListener('acmsAddCustomFieldGroup', (event) => {
        const newRow = event.obj.item;
        if (newRow && newRow.classList.contains('js-zoho-field')) {
          const newIndex = fieldRows.length;
          mountFieldApiSelect(newRow, newIndex);
          setFieldRows(prev => [...prev, newRow]);
        }
      });
    }
  }, []);

  // 行にFieldApiSelectをマウントする関数
  const mountFieldApiSelect = (row: Element, index: number) => {
    // スコープ選択要素と、フィールド選択用のコンテナを取得
    const scopeSelect = row.querySelector('select[name^="zoho_field_scope"]') as HTMLSelectElement;
    const fieldContainer = row.querySelector('td:nth-child(4) div') as HTMLElement;
    const fieldInput = row.querySelector('input[name^="zoho_field_cms_key"]') as HTMLInputElement;

    if (scopeSelect && fieldContainer) {
      // 既存のフィールド入力要素を非表示にする
      if (fieldInput) {
        fieldInput.style.display = 'none';
      }

      // ReactコンポーネントをDOMにマウント
      const root = createRoot(fieldContainer);
      root.render(
        <FieldApiSelect
          scopeElement={scopeSelect}
          fieldElement={fieldInput}
          index={index}
        />
      );
    }
  };

  return null;
}