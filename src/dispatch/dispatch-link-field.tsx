import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ModuleSelect } from '../features/link-field/module-select';
import { ModuleFieldSelect } from '../features/link-field/module-field-select';

const linkFieldId = '#js-acms-zoho-link-field';

const renderModuleSelect = (props: {
  name: string;
  value: string;
  relationItemId: string | null;
  onModuleChange: (moduleApiName: string) => void;
}) => <ModuleSelect {...props} />;

const renderItemSelect = (props: {
  name: string;
  value: string;
  moduleApiName: string | null;
}) => <ModuleFieldSelect {...props} />;

export default function DispatchLinkField() {
  const [roots, setRoots] = useState<Map<Element, Root>>(new Map());
  const rootsRef = React.useRef<Map<Element, Root>>(new Map());

  /**
   * React Rootを取得または作成する共通ロジック
   */
  const getOrCreateRoot = (element: HTMLElement): Root | null => {
    let root = rootsRef.current.get(element);

    if (!root) {
      try {
        root = createRoot(element);
        rootsRef.current.set(element, root);
        setRoots(prev => new Map(prev.set(element, root)));
      } catch (error) {
        console.error('Error creating React root:', error);
        return null;
      }
    }

    return root;
  };

  useEffect(() => {
    const linkFieldContainer = document.querySelector(linkFieldId);

    if (!linkFieldContainer) {
      return;
    }

    // 既存の行を取得してマウント
    mountExistingRows();

    // 新しい行が追加されたときのイベントリスナー
    const handleAddRow = (event: CustomEvent) => {
      const newRow = event.detail?.item;
      if (newRow && newRow.closest(linkFieldId)) {
        mountLinkFieldRow(newRow);
        // setFieldRows(prev => [...prev, newRow]); // 削除: 未定義の関数
      }
    };

    // ACMSのイベントリスナーを設定
    if (window.ACMS && window.ACMS.addListener) {
      window.ACMS.addListener('acmsAddCustomFieldGroup', handleAddRow);
    }

    // カスタムイベントリスナーも設定（フォールバック）
    document.addEventListener('acmsAddCustomFieldGroup', handleAddRow as EventListener);

    return () => {
      rootsRef.current.forEach(root => root.unmount());
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
    const linkFieldContainer = document.querySelector(linkFieldId);
    if (!linkFieldContainer) return;

    const rows = linkFieldContainer.querySelectorAll('tbody tr:not(.item-template)');
    rows.forEach(mountLinkFieldRow);
  };

  /**
   * 単一行のReactコンポーネントをマウント
   */
  const mountLinkFieldRow = (row: Element) => {
    const moduleDiv = row.querySelector('div[data-acms-zoho-link-field-module]') as HTMLElement;
    const itemDiv = row.querySelector('div[data-acms-zoho-link-field-item]') as HTMLElement;

    if (moduleDiv) mountModuleSelect(moduleDiv);
    if (itemDiv) mountModuleFieldSelect(itemDiv);
  };

  /**
   * ModuleSelectコンポーネントをマウント
   */
  const mountModuleSelect = (moduleDiv: HTMLElement) => {
    const name = moduleDiv.getAttribute('name') || '';
    const value = moduleDiv.getAttribute('value') || '';
    const row = moduleDiv.closest('tr');
    const itemDiv = row?.querySelector('div[data-acms-zoho-link-field-item]') as HTMLElement;

    const root = getOrCreateRoot(moduleDiv);
    if (!root) return;

    root.render(
      renderModuleSelect({
        name,
        value,
        relationItemId: null,
        onModuleChange: (moduleApiName) => handleModuleChange(moduleApiName, itemDiv)
      })
    );
  };

  /**
   * ModuleFieldSelectコンポーネントをマウント
   */
  const mountModuleFieldSelect = (itemDiv: HTMLElement, moduleApiName: string | null = null) => {
    const name = itemDiv.getAttribute('name') || '';
    const value = itemDiv.getAttribute('value') || '';

    const root = getOrCreateRoot(itemDiv);
    if (!root) return;

    root.render(
      renderItemSelect({
        name,
        value,
        moduleApiName
      })
    );
  };

  /**
   * モジュール変更時にModuleFieldSelectを更新
   */
  const handleModuleChange = (moduleApiName: string, itemDiv: HTMLElement | null) => {
    if (!itemDiv) return;
    mountModuleFieldSelect(itemDiv, moduleApiName);
  };

  return null; // このコンポーネント自体は何もレンダリングしない
}
