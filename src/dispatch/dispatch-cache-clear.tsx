import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheClearButton } from '../features/cache-clear/cache-clear-button';

const cacheClearContainerSelector = '.js-acms-zoho-cache-clear';

// マウント済み要素を追跡
const mountedElements = new WeakSet<Element>();

export default function DispatchCacheClear() {
  useEffect(() => {
    const containers = document.querySelectorAll(cacheClearContainerSelector);

    containers.forEach(container => {
      // 既にマウント済みの要素はスキップ
      if (mountedElements.has(container)) {
        return;
      }

      try {
        const root = createRoot(container as HTMLElement);
        root.render(<CacheClearButton />);

        // マウント完了後に要素を追跡リストに追加
        mountedElements.add(container);

        console.log('CacheClearButton mounted to:', container);
      } catch (error) {
        console.error('Error mounting CacheClearButton:', error);
      }
    });
  }, []);

  return null; // このコンポーネント自体は何もレンダリングしない
}
