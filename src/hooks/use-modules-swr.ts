import useSWR from 'swr';
import { ModuleData } from '../types';


const fetcher = async (url: string): Promise<ModuleData[]> => {
  const formData =  new FormData();
  formData.append('ACMS_POST_Zoho_Module', 'exec');
  formData.append('formToken', window.csrfToken || '');

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData,
  };

  const response = await fetch(url, options);
  const json = await response.json();

  console.log('Fetched modules:', json);

  return json;
};

export const useModulesSWR = () => {
  const rootUrl = (window as any).ACMS?.Config?.root || '/';

  const { data, error, isLoading, mutate } = useSWR<ModuleData[]>(
    rootUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  return {
    modules: data || [],
    isLoading,
    error,
    mutate,
  };
};
