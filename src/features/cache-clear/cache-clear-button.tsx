import { useState } from 'react';
import { useSWRConfig } from 'swr';

export const CacheClearButton = () => {
  const { cache, mutate } = useSWRConfig();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);

    try {
      // 1. サーバーサイドキャッシュをクリア
      const rootUrl = (window as any).ACMS?.Config?.root || '/';
      const formData = new FormData();
      formData.append('ACMS_POST_Zoho_CacheClear', 'exec');
      formData.append('formToken', window.csrfToken || '');
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

      window.alert('キャッシュをクリアしました。ページをリロードしてください。');
    } catch (error) {
      console.error('キャッシュクリアに失敗しました:', error);
      window.alert('キャッシュクリアに失敗しました');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <button
      type="button"
      className="acms-admin-btn acms-admin-btn-admin"
      onClick={handleClearCache}
      disabled={isClearing}
      title="サーバー・クライアントのキャッシュをクリアします"
    >キャッシュクリア</button>
  );
};
