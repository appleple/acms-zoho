import { SWRConfig } from 'swr'
import DispatchCacheClear from './dispatch/dispatch-cache-clear';
import DispatchLinkField from './dispatch/dispatch-link-field';

export default function App() {
  return (
    <>
      <SWRConfig value={{ provider: () => new Map() }}>
        <DispatchCacheClear />
        <DispatchLinkField />
      </SWRConfig>
    </>
  );
}
