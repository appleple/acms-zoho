export interface ModuleField {
  apiName: string;
  fieldName: string;
  dataType?: string;
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
