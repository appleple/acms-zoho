/* eslint no-nested-ternary: 0 */

import { StylesConfig } from 'react-select';

export default {
  container: (base) => ({
    ...base,
    fontSize: 'var(--acms-admin-rich-select-font-size)',
    textAlign: 'left',
    lineHeight: 1,
  }),
  control: (base, state) => ({
    ...base,
    color: 'var(--acms-admin-rich-select-color)',
    minHeight: 'var(--acms-admin-rich-select-height)',
    backgroundColor: 'var(--acms-admin-rich-select-bg-color)',
    border: 'var(--acms-admin-rich-select-border)',
    borderRadius: 'var(--acms-admin-rich-select-border-radius)',
    boxSizing: 'border-box',
    padding: '0 5px',
    lineHeight: 'var(--acms-admin-rich-select-line-height)',
    boxShadow:
      state.isFocused && !state.menuIsOpen
        ? 'var(--acms-admin-rich-select-focused-box-shadow)'
        : 'var(--acms-admin-rich-select-box-shadow)',
    ...(state.menuIsOpen && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderColor: 'var(--acms-admin-rich-select-open-border-color) !important',
      backgroundColor: 'var(--acms-admin-rich-select-open-bg-color)',
    }),
    ...(state.isFocused &&
      !state.menuIsOpen && {
        borderColor: 'var(--acms-admin-rich-select-focused-border-color) !important',
      }),
    ...(state.isDisabled && {
      color: 'var(--acms-admin-rich-select-disabled-color)',
      backgroundColor: 'var(--acms-admin-rich-select-disabled-bg-color)',
      borderColor: 'var(--acms-admin-rich-select-disabled-border-color) !important',
      cursor: 'not-allowed',
    }),
    '&:hover': {
      backgroundColor: 'var(--acms-admin-rich-select-hover-bg-color)',
      borderColor: 'var(--acms-admin-rich-select-hover-border-color)',
    },
    borderBottomLeftRadius: undefined,
    borderBottomRightRadius: undefined,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0',
  }),
  input: (base) => ({
    ...base,
    margin: '0px',
    padding: '0px',
    '> input': {
      boxShadow: 'none !important',
      minHeight: 'auto !important',
    },
  }),
  clearIndicator: (base, state) => ({
    ...base,
    ...(state.isFocused && {
      color: 'hsl(0, 0%, 80%)', // フォーカス時でも色は変えない
    }),
    padding: 0,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--acms-admin-rich-select-multi-value-bg-color)',
    color: 'var(--acms-admin-rich-select-multi-value-color)',
    borderColor: 'var(--acms-admin-rich-select-multi-value-border-color)',
    borderStyle: 'solid',
    borderWidth: '1px',
    fontSize: 'var(--acms-admin-rich-select-multi-value-font-size)',
  }),
  multiValueLabel: (base) => ({
    ...base,
    padding: '2px 5px',
    fontSize: '0.9em',
    order: 2,
  }),
  multiValueRemove: (base) => ({
    ...base,
    paddingRight: '2px',
    paddingLeft: '2px',
    borderRightColor: 'var(--acms-admin-rich-select-multi-value-border-color)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderRadius: 'none',
    order: 1,
    ':hover': {
      backgroundColor: 'inherit',
      color: 'inherit',
      cursor: 'pointer',
    },
  }),
  placeholder: (base) => ({
    ...base,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    color: 'var(--acms-admin-rich-select-placeholder-color)',
  }),
  menu: (base, state) => {
    return {
      ...base,
      margin: '4px 0 0',
      backgroundColor: 'var(--acms-admin-rich-select-menu-bg-color)',
      boxShadow: 'none',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--acms-admin-rich-select-menu-border-color)',
      borderRadius: '0 0 4px 4px',
      overflow: 'hidden',
      zIndex: 'var(--acms-admin-rich-select-menu-z-index)',
      lineHeight: 1.2,
      width: 'max-content',
      minWidth: base.width,
      maxWidth: `calc(100vw - ${(state.innerRef as React.RefObject<HTMLDivElement>).current?.getBoundingClientRect().left}px)`,
    };
  },
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    padding: '8px 10px',
    backgroundColor: state.isSelected
      ? 'var(--acms-admin-rich-select-option-selected-bg-color)'
      : state.isFocused
        ? 'var(--acms-admin-rich-select-option-focused-bg-color)'
        : 'var(--acms-admin-rich-select-option-bg-color)',
    color: state.isSelected
      ? 'var(--acms-admin-rich-select-option-selected-color)'
      : state.isFocused
        ? 'var(--acms-admin-rich-select-option-focused-color)'
        : 'var(--acms-admin-rich-select-option-color)',
    cursor: 'pointer',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    padding: '8px 10px',
    textAlign: 'left',
    color: 'var(--acms-admin-rich-select-no-options-color)',
  }),
  loadingMessage: (base) => ({
    ...base,
    padding: '8px 10px',
    textAlign: 'left',
    color: 'var(--acms-admin-rich-select-loading-color)',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 'var(--acms-admin-rich-select-menu-z-index)',
  }),
} as StylesConfig;
