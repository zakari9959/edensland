import React, { useMemo } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { SelectOption, Book } from '../../types';
import { FlipNavProps } from '../../types';
import FlipButton from '../FlipButton/FlipButton';
import FlipSelect from '../FlipSelect/FlipSelect';

export default function FlipNav({ ...props }: FlipNavProps) {
  return (
    <div className='book__page__navigation'>
      <FlipSelect {...props} />
      <FlipButton {...props} />
    </div>
  );
}
