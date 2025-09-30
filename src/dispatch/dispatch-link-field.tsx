import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LinkFieldRow } from '../features/link-field/link-field-row';

const linkFieldContainerSelector = '#js-acms-zoho-link-field';
const linkFieldRowSelector = '.js-acms-zoho-link-field-row';


// マウント済み要素を追跡
const mountedElements = new WeakSet<Element>();

export default function DispatchLinkField() {
  useEffect(() => {
    const linkFieldContainer = document.querySelector(linkFieldContainerSelector);

    if (!linkFieldContainer) {
      return;
    }

    // 既存の行を取得してマウント
    mountExistingRows();

    // 新しい行が追加されたときのイベントリスナー
    const handleAddRow = (event: CustomEvent) => {
      const newRow = event.detail?.item;
      if (newRow && newRow.closest(linkFieldContainerSelector)) {
        const linkFieldRow = newRow.querySelector(linkFieldRowSelector) || newRow.closest(linkFieldRowSelector);
        if (linkFieldRow) {
          mountLinkFieldRow(linkFieldRow);
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
    const linkFieldContainer = document.querySelector(linkFieldContainerSelector);
    if (!linkFieldContainer) return;

    const linkFieldRows = linkFieldContainer.querySelectorAll(linkFieldRowSelector);
    linkFieldRows.forEach(mountLinkFieldRow);
  };

  /**
   * 単一行のReactコンポーネントをマウント
   */
  const mountLinkFieldRow = (linkFieldRow: Element) => {
    const moduleInput = linkFieldRow.querySelector('[data-acms-zoho-link-field-module]') as HTMLInputElement;
    const moduleFieldInput = linkFieldRow.querySelector('[data-acms-zoho-link-field-module-field]') as HTMLInputElement;
    const rootElement = linkFieldRow.querySelector('[data-acms-zoho-link-field-root]') as HTMLElement;

    if (moduleInput && moduleFieldInput && rootElement) {
      mountUnifiedLinkFieldRow(linkFieldRow, moduleInput, moduleFieldInput, rootElement);
    }
  };

  /**
   * 統合されたLinkFieldRowコンポーネントをマウント
   */
  const mountUnifiedLinkFieldRow = (linkFieldRow: Element, moduleInput: HTMLInputElement, moduleFieldInput: HTMLInputElement, rootElement: HTMLElement) => {
    // 既にマウント済みの行はスキップ
    if (mountedElements.has(linkFieldRow)) {
      return;
    }

    const moduleName = moduleInput.getAttribute('name') || '';
    const moduleValue = moduleInput.value || moduleInput.getAttribute('value') || '';
    const moduleFieldName = moduleFieldInput.getAttribute('name') || '';
    const moduleFieldValue = moduleFieldInput.value || moduleFieldInput.getAttribute('value') || '';

    // data-acms-zoho-link-field-root要素にマウント
    const root = createRoot(rootElement);
    if (!root) return;

    try {
      root.render(
        <LinkFieldRow
          moduleInputRef={moduleInput}
          moduleFieldInputRef={moduleFieldInput}
          moduleName={moduleName}
          moduleValue={moduleValue}
          moduleFieldName={moduleFieldName}
          moduleFieldValue={moduleFieldValue}
        />
      );

      // マウント完了後に行を追跡リストに追加
      mountedElements.add(linkFieldRow);
    } catch (error) {
      console.error('Error rendering LinkFieldRow:', error);
    }
  };

  return null; // このコンポーネント自体は何もレンダリングしない
}
