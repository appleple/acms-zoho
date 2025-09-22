import { components } from 'react-select';
import styled from 'styled-components';

import type { DropdownIndicatorProps, GroupBase } from 'react-select';

const ArrowIcon = styled.span<{ $isMenuOpen: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;

  /* system/images/marker/arrow_block04.png をbase64に変換したURL */
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTMuMTEuMTnMGoPBAAAAWklEQVQImW3MsQnCAABE0Zds4Aqu4C7BWoQbQHCXm0Cyi43YSyZwBLFJIZiD3/wPN7SdMdnebcQJz434wHmAtnvcsVvjG4ckywhJXjjiszIlWf4+217bXn7dF6cNFzP8s1OrAAAAAElFTkSuQmCC');
  background-repeat: no-repeat;
  background-position: center;
  ${({ $isMenuOpen }) => ($isMenuOpen ? 'transform: rotate(180deg);' : '')}
`;

const DropdownIndicator = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => (
  <components.DropdownIndicator {...props}>
    <ArrowIcon aria-hidden $isMenuOpen={props.selectProps.menuIsOpen} />
  </components.DropdownIndicator>
);

export default DropdownIndicator;
