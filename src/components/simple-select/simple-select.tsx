import { useState, useEffect } from 'react';

interface Props {
  name: string;
  className?: string;
  defaultValue?: string;
  originalInputRef?: HTMLInputElement;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const SimpleSelect = ({
  name,
  className = '',
  defaultValue = '',
  originalInputRef,
  options,
  placeholder = '選択してください',
  onChange,
}: Props) => {
  const [value, setValue] = useState('');

  // optionsが読み込まれた後にdefaultValueを設定
  useEffect(() => {
    if (options.length > 0 && defaultValue && value === '') {
      const hasOption = options.some(option => option.value === defaultValue);
      if (hasOption) {
        setValue(defaultValue);
      }
    }
  }, [options, defaultValue, value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);

    // originalInputRefに値を設定
    if (originalInputRef) {
      originalInputRef.value = selectedValue;
    }

    // onChangeコールバックを実行
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <select
      name={name}
      className={className}
      value={value}
      onChange={handleChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};