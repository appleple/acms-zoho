import { forwardRef } from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import type { SelectInstance, Props, GroupBase, StylesConfig } from 'react-select';
import stylesConfig from './styles';
import DropdownIndicator from './components/dropdown-indicator';

type RichSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group>;

const RichSelect = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  { styles, components, className, ...props }: RichSelectProps<Option, IsMulti, Group>,
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
    classNames={{
      menuPortal: () => 'acms-admin-rich-select-menu-portal',
    }}
    styles={
      {
        ...stylesConfig,
        ...styles,
      } as StylesConfig<Option, IsMulti, Group>
    }
    {...props}
  />
);

RichSelect.displayName = 'RichSelect';

export default forwardRef(RichSelect) as <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: RichSelectProps<Option, IsMulti, Group> & { ref?: React.Ref<SelectInstance<Option, IsMulti, Group>> }
) => JSX.Element;
