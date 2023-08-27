'use client';
import React from 'react';
import { FlipNavProps } from '../../types';
import FlipButton from '../FlipButton/FlipButton';
import FlipSelect from '../FlipSelect/FlipSelect';
import './FlipNav.css';

export default function FlipNav({ ...props }: FlipNavProps) {
  return (
    <div className='book__page__navigation'>
      <FlipSelect {...props} />
      <FlipButton {...props} />
    </div>
  );
}
