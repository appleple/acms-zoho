import { components } from 'react-select';

import type { DropdownIndicatorProps, GroupBase } from 'react-select';

const arrowIconStyle = {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTMuMTEuMTnMGoPBAAAAWklEQVQImW3MsQnCAABE0Zds4Aau4C7BWoQbQHCXm0Cyi43YSyZwBLFJIZiD3/wPN7SdMdnebcQJz434wHmAtnvcsVvjG4ckywhJXjjiszIlWf4+217bXn7dF6cNFzP8s1OrAAAAAElFTkSuQmCC")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
} as const;

const DropdownIndicator = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => (
  <components.DropdownIndicator {...props}>
    <span
      aria-hidden
      style={{
        ...arrowIconStyle,
        transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
      }}
    />
  </components.DropdownIndicator>
);

export default DropdownIndicator;