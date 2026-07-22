export interface ModuleField {
  apiName: string;
  fieldName: string;
  dataType?: string;
  required?: boolean;
  readOnly?: boolean;
  unique?: boolean;
}

export interface Module {
  apiName: string;
  moduleName: string | '';
  singularLabel: string;
}

export interface ModuleWithFields extends Module {
  fields?: ModuleField[];
}

export interface LinkFieldState {
  modules: ModuleWithFields[];
}
