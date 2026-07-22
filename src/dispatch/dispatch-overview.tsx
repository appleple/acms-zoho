import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MappingOverview } from '../features/overview/mapping-overview';

const overviewContainerId = 'js-acms-zoho-overview';

/**
 * form.html 上部の概要コンテナへ MappingOverview をポータルする。
 * App の SWRConfig 配下でレンダーするため、モジュール/項目のキャッシュを他アイランドと共有できる。
 */
export default function DispatchOverview() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(overviewContainerId));
  }, []);

  if (!container) {
    return null;
  }

  return createPortal(<MappingOverview />, container);
}
