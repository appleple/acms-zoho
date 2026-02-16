import { SWRConfig } from 'swr';
import DispatchCacheClear from './dispatch/dispatch-cache-clear';
import DispatchLinkField from './dispatch/dispatch-link-field';
import DispatchUniqueKey from './dispatch/dispatch-unique-key';
import DispatchRelatedField from './dispatch/dispatch-related-field';

export default function App() {
  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        {/* Zohoと連携するa-blog cmsフィールドの設定 */}
        <DispatchCacheClear />
        <DispatchLinkField />
        <DispatchUniqueKey />
        <DispatchRelatedField />
      </SWRConfig>
    </>
  );
}
