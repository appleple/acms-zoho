import { SWRConfig } from 'swr'
import DispatchCacheClear from './dispatch/dispatch-cache-clear';
import DispatchLinkField from './dispatch/dispatch-link-field';
import DispatchUniqueKey from './dispatch/dispatch-unique-key';

export default function App() {
  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        {/* Zohoと連携するa-blog cmsフィールドの設定 */}
        <DispatchCacheClear />
        <DispatchLinkField />
        <DispatchUniqueKey />
      </SWRConfig>
    </>
  );
}
