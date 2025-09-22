export interface ModuleField {
  fieldName: string;
  apiName: string;
}

export interface ModuleData {
  moduleName: string;
  apiName: string;
  fields: ModuleField[] | null;
}

export interface LinkFieldState {
  modules: ModuleData[];
}