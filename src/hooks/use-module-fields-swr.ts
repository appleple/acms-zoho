import useSWR from 'swr';
import { ModuleField } from '../types';

const fetcher = async (moduleApiName: string): Promise<ModuleField[]> => {
  // ダミーデータを返す
  await new Promise(resolve => setTimeout(resolve, 300)); // ローディング状態をシミュレート

  const fieldsByModule: Record<string, ModuleField[]> = {
    Leads: [
      { fieldName: 'メール', apiName: 'Email' },
      { fieldName: '名', apiName: 'First_Name' },
      { fieldName: '姓', apiName: 'Last_Name' },
      { fieldName: '電話番号', apiName: 'Phone' },
      { fieldName: '会社', apiName: 'Company' },
    ],
    Contacts: [
      { fieldName: 'メール', apiName: 'Email' },
      { fieldName: '名', apiName: 'First_Name' },
      { fieldName: '姓', apiName: 'Last_Name' },
      { fieldName: 'モバイル', apiName: 'Mobile' },
      { fieldName: '部門', apiName: 'Department' },
    ],
    Accounts: [
      { fieldName: '取引先名', apiName: 'Account_Name' },
      { fieldName: '電話番号', apiName: 'Phone' },
      { fieldName: 'ウェブサイト', apiName: 'Website' },
      { fieldName: '業界', apiName: 'Industry' },
    ],
    Deals: [
      { fieldName: '商談名', apiName: 'Deal_Name' },
      { fieldName: '金額', apiName: 'Amount' },
      { fieldName: 'ステージ', apiName: 'Stage' },
      { fieldName: '確度', apiName: 'Probability' },
    ],
  };

  return fieldsByModule[moduleApiName] || [];
};

export const useModuleFieldsSWR = (moduleApiName: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<ModuleField[]>(
    moduleApiName ? `module-fields-${moduleApiName}` : null,
    () => moduleApiName ? fetcher(moduleApiName) : Promise.resolve([]),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  return {
    fields: data || [],
    isLoading,
    error,
    mutate,
  };
};
