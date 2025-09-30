export interface ModuleField {
  apiName: string;
  fieldName: string;
}

export interface ModuleData {
  apiName: string;
  moduleName: string | '';
  singularLabel: string;
  fields?: ModuleField[];
}

export interface LinkFieldState {
  modules: ModuleData[];
}
