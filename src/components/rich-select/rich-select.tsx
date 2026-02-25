import { forwardRef, useEffect, useRef } from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import type { SelectInstance, Props, GroupBase, StylesConfig } from 'react-select';
import stylesConfig from './styles';
import DropdownIndicator from './components/dropdown-indicator';

/**
 * RichSelectコンポーネント
 * a-blog cms 本体に組み込まれているものをカスタマイズしたコンポーネントです。
 *
 * 特徴:
 * - isMultiの場合、nameとformを削除してReact Selectの自動hidden input生成を無効化
 * - hiddenInputSeparatorプロパティで区切り文字を指定可能（デフォルトはカンマ）
 */

type RichSelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & {
  hiddenInputSeparator?: string; // isMultiの場合の区切り文字（デフォルト: ","）
};

const RichSelect = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  { styles, components, className, hiddenInputSeparator = ',', ...props }: RichSelectProps<Option, IsMulti, Group>,
  ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) => {
  const selectRef = useRef<SelectInstance<Option, IsMulti, Group>>(null);

  // isMultiかつrefが指定されている場合はnameとformを削除してReact Selectの自動hidden input生成を無効化
  const selectProps = (props.isMulti && ref) ? { ...props, name: undefined, form: undefined } : props;

  const combinedRef = (node: SelectInstance<Option, IsMulti, Group>) => {
    selectRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <Select
      ref={combinedRef}
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
      {...selectProps}
    />
  );
};

RichSelect.displayName = 'RichSelect';

export default forwardRef(RichSelect) as <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: RichSelectProps<Option, IsMulti, Group> & { ref?: React.Ref<SelectInstance<Option, IsMulti, Group>> }
) => JSX.Element;
