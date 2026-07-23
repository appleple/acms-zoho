import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { getCsrfToken, getRootUrl } from '../../utils';

export const CacheClearButton = () => {
  const { cache, mutate } = useSWRConfig();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);

    try {
      // 1. サーバーサイドキャッシュをクリア
      const rootUrl = getRootUrl();
      const formData = new FormData();
      formData.append('ACMS_POST_Zoho_CacheClear', 'exec');
      formData.append('formToken', getCsrfToken());
      await fetch(rootUrl, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      // 2. SWRキャッシュを全てクリア（Map型のcacheの場合）
      if (cache instanceof Map) {
        cache.clear();
      } else {
        // 特定のキーパターンでクリア
        mutate('modules', undefined, { revalidate: false });

        // モジュールフィールド関連のキャッシュをクリア
        const moduleFieldKeys = Array.from(cache.keys?.() || [])
          .filter(key => typeof key === 'string' && key.startsWith('module-fields-'));

        moduleFieldKeys.forEach(key => {
          mutate(key, undefined, { revalidate: false });
        });
      }

      await (window.ACMS.Library?.dialog?.alert ?? window.alert)('Zohoのキャッシュをクリアしました。ページをリロードしZohoから情報を再取得してください。');
    } catch (error) {
      console.error('Zohoのキャッシュクリアに失敗しました:', error);
      await (window.ACMS.Library?.dialog?.alert ?? window.alert)('Zohoのキャッシュクリアに失敗しました');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <button
      type="button"
      className="acms-admin-btn acms-admin-btn-admin acms-admin-btn-admin-sm"
      onClick={handleClearCache}
      disabled={isClearing}
      title="Zohoでタブや項目を追加・変更したときにクリックすると、最新のタブ/項目一覧を再取得します"
    >{isClearing ? '再取得中…' : '↻ Zohoから再取得'}</button>
  );
};
