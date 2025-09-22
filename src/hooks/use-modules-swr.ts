import useSWR from 'swr';
import { ModuleData } from '../types';


const fetcher = async (url: string): Promise<ModuleData[]> => {
  // ダミーデータを返す
  // await new Promise(resolve => setTimeout(resolve, 500)); // ローディング状態をシミュレート
  // return [
  //   {
  //     moduleName: 'リード',
  //     apiName: 'Leads',
  //     fields: null,
  //   },
  //   {
  //     moduleName: '連絡先',
  //     apiName: 'Contacts',
  //     fields: null,
  //   },
  //   {
  //     moduleName: '取引先',
  //     apiName: 'Accounts',
  //     fields: null,
  //   },
  //   {
  //     moduleName: '商談',
  //     apiName: 'Deals',
  //     fields: null,
  //   },
  // ];

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
  const { data, error, isLoading, mutate } = useSWR<ModuleData[]>(
    window.ACMS.Config.root,
    fetcher,
    // {
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false,
    //   shouldRetryOnError: false,
    // }
  );

  return {
    modules: data || [],
    isLoading,
    error,
    mutate,
  };
};
