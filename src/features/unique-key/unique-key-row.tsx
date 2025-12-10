import { ModuleSelect } from '../../components/module-select/module-select';

interface ModuleScopeSelectProps {
  inputRef: HTMLInputElement;
  value: string;
}

export const ModuleScopeSelect = ({ inputRef, value }: ModuleScopeSelectProps) => {
  return (
    <ModuleSelect
      defaultValue={value}
      originalInputRef={inputRef}
    />
  );
};
