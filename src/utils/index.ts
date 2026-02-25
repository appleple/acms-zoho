import { Module, ModuleWithFields } from '../types';

/**
 * JSON文字列をModule配列にパースし、ModuleWithFields[]として返す
 */
export const parseModulesJson = (value: string): ModuleWithFields[] => {
  if (!value) return [];
  try {
    const parsed: Module[] = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(m => ({
      apiName: m.apiName,
      moduleName: m.moduleName || '',
      singularLabel: m.singularLabel || m.apiName,
    }));
  } catch {
    return [];
  }
};
