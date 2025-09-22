import { forwardRef } from 'react';
import Select from 'react-select/async';
import classnames from 'classnames';
import type { SelectInstance, GroupBase, StylesConfig } from 'react-select';
import type { AsyncProps } from 'react-select/async';
import DropdownIndicator from './components/dropdown-indicator';
import stylesConfig from './styles';

type AsyncSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = AsyncProps<Option, IsMulti, Group>;

const AsyncSelect = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  { styles, components, className, ...props }: AsyncSelectProps<Option, IsMulti, Group>,
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

AsyncSelect.displayName = 'AsyncSelect';

export default forwardRef(AsyncSelect) as <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: AsyncSelectProps<Option, IsMulti, Group> & { ref?: React.Ref<SelectInstance<Option, IsMulti, Group>> }
) => JSX.Element;
