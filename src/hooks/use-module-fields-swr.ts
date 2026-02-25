import useSWR from 'swr';
import { ModuleField } from '../types';

const fetcher = async (moduleApiNames: string[]): Promise<{ data: ModuleField[] }[]> => {
  if (moduleApiNames.length === 0) {
    return [];
  }

  const promises = moduleApiNames.map(async (moduleApiName) => {
    try {
      // 実際のAPI呼び出し
      const formData = new FormData();
      formData.append('ACMS_POST_Zoho_ModuleField', 'exec');
      formData.append('moduleApiName', moduleApiName);
      formData.append('formToken', window.csrfToken || '');

      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
      };

      const rootUrl = (window as any).ACMS?.Config?.root || '/';
      const response = await fetch(rootUrl, options);
      const json = await response.json();

      return { data: json };
    } catch (error) {
      console.error(`Error fetching fields for module ${moduleApiName}:`, error);
      return { data: [] };
    }
  });

  return Promise.all(promises);
};

export const useModuleFieldsSWR = (moduleApiNames: string[]) => {
  // moduleApiNamesの文字列をキーとして使用（配列の順序を保持）
  const cacheKey = moduleApiNames.length > 0 ? `module-fields-${moduleApiNames.join(',')}` : null;

  const { data: fieldsResults, isLoading, error, mutate } = useSWR<{ data: ModuleField[] }[]>(
    cacheKey,
    () => fetcher(moduleApiNames),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  return {
    fieldsResults: fieldsResults || [],
    isLoading,
    error,
    mutate,
  };
};
