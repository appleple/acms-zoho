import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ModuleScopeSelect } from '../features/unique-key/unique-key-row';

const uniqueKeyContainerSelector = '#js-acms-zoho-unique-key';
const uniqueKeyRowSelector = '.js-acms-zoho-unique-key-row';

// マウント済み要素を追跡
const mountedElements = new WeakSet<Element>();

export default function DispatchUniqueKey() {
  useEffect(() => {
    const uniqueKeyContainer = document.querySelector(uniqueKeyContainerSelector);

    if (!uniqueKeyContainer) {
      return;
    }

    // 既存の行を取得してマウント
    mountExistingRows();

    // 新しい行が追加されたときのイベントリスナー
    const handleAddRow = (event: CustomEvent) => {
      const newRow = event.detail?.item;
      if (newRow && newRow.closest(uniqueKeyContainerSelector)) {
        const rows = newRow.querySelectorAll(uniqueKeyRowSelector);
        rows.forEach((row: Element) => {
          mountUniqueKeyCell(row);
        });
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
   * 既存のセルをマウント
   */
  const mountExistingRows = () => {
    const uniqueKeyContainer = document.querySelector(uniqueKeyContainerSelector);
    if (!uniqueKeyContainer) return;

    const cells = uniqueKeyContainer.querySelectorAll(uniqueKeyRowSelector);
    cells.forEach(mountUniqueKeyCell);
  };

  /**
   * 単一セルのReactコンポーネントをマウント
   */
  const mountUniqueKeyCell = (cell: Element) => {
    // 既にマウント済みの行はスキップ
    if (mountedElements.has(cell)) {
      return;
    }

    // Insert Scope
    const insertRoot = cell.querySelector('[data-acms-zoho-unique-key-insert-root]') as HTMLElement;
    const insertInput = cell.querySelector('[data-acms-zoho-unique-key-insert-scope]') as HTMLInputElement;

    // Update Scope
    const updateRoot = cell.querySelector('[data-acms-zoho-unique-key-update-root]') as HTMLElement;
    const updateInput = cell.querySelector('[data-acms-zoho-unique-key-update-scope]') as HTMLInputElement;

    try {
      // Insert Scopeをマウント
      if (insertRoot && insertInput) {
        const insertValue = insertInput.value || insertInput.getAttribute('value') || '';
        const insertReactRoot = createRoot(insertRoot);
        insertReactRoot.render(
          <ModuleScopeSelect
            inputRef={insertInput}
            value={insertValue}
          />
        );
      }

      // Update Scopeをマウント
      if (updateRoot && updateInput) {
        const updateValue = updateInput.value || updateInput.getAttribute('value') || '';
        const updateReactRoot = createRoot(updateRoot);
        updateReactRoot.render(
          <ModuleScopeSelect
            inputRef={updateInput}
            value={updateValue}
          />
        );
      }

      // マウント完了後にセルを追跡リストに追加
      mountedElements.add(cell);
    } catch (error) {
      console.error('Error rendering ModuleScopeSelect:', error);
    }
  };

  return null; // このコンポーネント自体は何もレンダリングしない
}
