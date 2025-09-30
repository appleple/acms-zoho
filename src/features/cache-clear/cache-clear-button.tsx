import { useSWRConfig } from 'swr';

export const CacheClearButton = () => {
  const { cache, mutate } = useSWRConfig();

  const handleClearCache = () => {
    // SWRキャッシュを全てクリア（Map型のcacheの場合）
    if (cache instanceof Map) {
      cache.clear();
    } else {
      // 特定のキーパターンでクリア
      mutate('modules', undefined, { revalidate: false });

      // モジュールフィールド関連のキャッシュをクリア
      // 既知のキーを個別に削除
      const moduleFieldKeys = Array.from(cache.keys?.() || [])
        .filter(key => typeof key === 'string' && key.startsWith('module-fields-'));

      moduleFieldKeys.forEach(key => {
        mutate(key, undefined, { revalidate: false });
      });
    }

    console.log('SWRキャッシュをクリアしました');

    // 成功メッセージを表示（オプション）
    if (window.alert) {
      window.alert('キャッシュをクリアしました');
    }
  };

  return (
    <button
      type="button"
      className="acms-admin-btn acms-admin-btn-admin"
      onClick={handleClearCache}
      title="SWRキャッシュをクリアします"
    >
      <i className="acms-admin-icon-refresh" aria-hidden="true"></i>
      キャッシュクリア
    </button>
  );
};
