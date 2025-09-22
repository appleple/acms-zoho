import { forwardRef } from 'react';
import Select from 'react-select/creatable';
import classnames from 'classnames';
import type { SelectInstance, GroupBase, StylesConfig } from 'react-select';
import type { CreatableProps } from 'react-select/creatable';
import DropdownIndicator from './components/dropdown-indicator';
import stylesConfig from './styles';

type CreatableSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = CreatableProps<Option, IsMulti, Group>;

const CreatableSelect = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  { styles, components, className, ...props }: CreatableSelectProps<Option, IsMulti, Group>,
  ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) => (
  <Select
    ref={ref}
    components={{
      IndicatorSeparator: () => null,
      DropdownIndicator,
      ...components,
    }}
    className={classnames('acms-admin-rich-select', className)}
    styles={
      {
        ...stylesConfig,
        ...styles,
      } as StylesConfig<Option, IsMulti, Group>
    }
    {...props}
  />
);

CreatableSelect.displayName = 'CreatableSelect';

export default forwardRef(CreatableSelect) as <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: CreatableSelectProps<Option, IsMulti, Group> & { ref?: React.Ref<SelectInstance<Option, IsMulti, Group>> }
) => JSX.Element;
