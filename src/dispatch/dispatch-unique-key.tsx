import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { UniqueKeyRow } from '../features/unique-key/unique-key-row';

const uniqueKeyContainerSelector = '#js-acms-zoho-unique-key';
const uniqueKeyRowSelector = '.js-acms-zoho-unique-key-row';

// マウント済み要素を追跡
const mountedElements = new WeakSet<Element>();

// 各行は独立した React root として mount されるため、React の useId() はルートをまたいだ
// 一意性を持たない（行ごとに同じ値を返す）。ページ全体で一意な行IDをここで発番して渡す。
let rowIdCounter = 0;

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
   * 行全体を1つの UniqueKeyRow としてマウントする。
   * insert/update スコープと重複判定キーの3 hidden を渡し、React 側で値を書き戻す。
   */
  const mountUniqueKeyCell = (cell: Element) => {
    if (mountedElements.has(cell)) {
      return;
    }

    const root = cell.querySelector('[data-acms-zoho-unique-key-root]') as HTMLElement | null;
    const uniqueKeyInput = cell.querySelector('[data-acms-zoho-unique-key-value]') as HTMLInputElement | null;
    const insertInput = cell.querySelector('[data-acms-zoho-unique-key-insert-scope]') as HTMLInputElement | null;
    const updateInput = cell.querySelector('[data-acms-zoho-unique-key-update-scope]') as HTMLInputElement | null;

    if (!root || !uniqueKeyInput || !insertInput || !updateInput) {
      return;
    }

    try {
      const reactRoot = createRoot(root);
      reactRoot.render(
        <UniqueKeyRow
          rowId={rowIdCounter++}
          insertInputRef={insertInput}
          updateInputRef={updateInput}
          uniqueKeyInputRef={uniqueKeyInput}
          insertValue={insertInput.value || insertInput.getAttribute('value') || ''}
          updateValue={updateInput.value || updateInput.getAttribute('value') || ''}
          uniqueKeyValue={uniqueKeyInput.value || uniqueKeyInput.getAttribute('value') || ''}
        />
      );
      mountedElements.add(cell);
    } catch (error) {
      console.error('Error rendering UniqueKeyRow:', error);
    }
  };

  return null; // このコンポーネント自体は何もレンダリングしない
}
