import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RelatedFieldRow } from '../features/related-field/related-field-row';

const relatedFieldContainerSelector = '#js-acms-zoho-related';
const relatedFieldRowSelector = '.js-acms-zoho-related-row';

// マウント済み要素を追跡
const mountedElements = new WeakSet<Element>();

export default function DispatchRelatedField() {
  useEffect(() => {
    const relatedFieldContainer = document.querySelector(relatedFieldContainerSelector);

    if (!relatedFieldContainer) {
      return;
    }

    // 既存の行を取得してマウント
    mountExistingRows();

    // 新しい行が追加されたときのイベントリスナー
    const handleAddRow = (event: CustomEvent) => {
      const newRow = event.detail?.item;
      if (newRow && newRow.closest(relatedFieldContainerSelector)) {
        const relatedFieldRow = newRow.querySelector(relatedFieldRowSelector) || newRow.closest(relatedFieldRowSelector);
        if (relatedFieldRow) {
          mountRelatedFieldRow(relatedFieldRow);
        }
      }
    };

    // ACMSのイベントリスナーを設定
    if (window.ACMS && window.ACMS.addListener) {
      window.ACMS.addListener('acmsAddCustomFieldGroup', handleAddRow);
    }

    // カスタムイベントリスナーも設定（フォールバック）
    document.addEventListener('acmsAddCustomFieldGroup', handleAddRow as EventListener);

    return () => {
      if (window.ACMS && window.ACMS.removeListener) {
        window.ACMS.removeListener('acmsAddCustomFieldGroup', handleAddRow);
      }
      document.removeEventListener('acmsAddCustomFieldGroup', handleAddRow as EventListener);
    };
  }, []);

  /**
   * 既存の行をマウント
   */
  const mountExistingRows = () => {
    const relatedFieldContainer = document.querySelector(relatedFieldContainerSelector);
    if (!relatedFieldContainer) return;

    const relatedFieldRows = relatedFieldContainer.querySelectorAll(relatedFieldRowSelector);
    relatedFieldRows.forEach(mountRelatedFieldRow);
  };

  /**
   * 単一行のReactコンポーネントをマウント
   */
  const mountRelatedFieldRow = (relatedFieldRow: Element) => {
    // 既にマウント済みの行はスキップ
    if (mountedElements.has(relatedFieldRow)) {
      return;
    }

    const scopeInput = relatedFieldRow.querySelector('[data-acms-zoho-related-scope]') as HTMLInputElement;
    const lookupIdInput = relatedFieldRow.querySelector('[data-acms-zoho-related-lookup-id]') as HTMLInputElement;
    const targetScopeInput = relatedFieldRow.querySelector('[data-acms-zoho-related-target-scope]') as HTMLInputElement;
    const compareFieldInput = relatedFieldRow.querySelector('[data-acms-zoho-related-compare-field]') as HTMLInputElement;
    const rootElement = relatedFieldRow.querySelector('[data-acms-zoho-related-root]') as HTMLElement;

    if (!scopeInput || !lookupIdInput || !targetScopeInput || !compareFieldInput || !rootElement) {
      return;
    }

    const scopeValue = scopeInput.value || scopeInput.getAttribute('value') || '';
    const lookupIdValue = lookupIdInput.value || lookupIdInput.getAttribute('value') || '';
    const targetScopeValue = targetScopeInput.value || targetScopeInput.getAttribute('value') || '';
    const compareFieldValue = compareFieldInput.value || compareFieldInput.getAttribute('value') || '';

    try {
      const root = createRoot(rootElement);
      root.render(
        <RelatedFieldRow
          scopeInputRef={scopeInput}
          scopeValue={scopeValue}
          lookupIdInputRef={lookupIdInput}
          lookupIdValue={lookupIdValue}
          targetScopeInputRef={targetScopeInput}
          targetScopeValue={targetScopeValue}
          compareFieldInputRef={compareFieldInput}
          compareFieldValue={compareFieldValue}
        />
      );

      // マウント完了後に行を追跡リストに追加
      mountedElements.add(relatedFieldRow);
    } catch (error) {
      console.error('Error rendering RelatedFieldRow:', error);
    }
  };

  return null;
}
