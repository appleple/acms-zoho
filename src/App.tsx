import { SWRConfig } from 'swr';
import DispatchCacheClear from './dispatch/dispatch-cache-clear';
import DispatchLinkField from './dispatch/dispatch-link-field';
import DispatchUniqueKey from './dispatch/dispatch-unique-key';
import DispatchRelatedField from './dispatch/dispatch-related-field';
import DispatchOverview from './dispatch/dispatch-overview';

export default function App() {
  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        {/* Zoho と連携する a-blog cms フィールドのマッピング設定 */}
        <DispatchOverview />
        <DispatchCacheClear />
        <DispatchLinkField />
        <DispatchUniqueKey />
        <DispatchRelatedField />
      </SWRConfig>
    </>
  );
}
