'use client';
import React, { useMemo } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { SelectOption, FlipNavProps } from '../../types';
import { useSelectedBookContext } from '@/app/context/bookDataContext';
import { useCurrentPageContext } from '@/app/context/currentPageContext';

export default function FlipSelect(props: FlipNavProps) {
  const { selectedBook, setSelectedBook } = useSelectedBookContext();
  const { currentPage, setCurrentPage } = useCurrentPageContext();
  const options: SelectOption[] | undefined = useMemo(() => {
    if (selectedBook && selectedBook.text) {
      return selectedBook.text.map((pagenb, index) => ({
        key: index,
        value: index,
        label: `Page ${index + 1}`,
      }));
    }
    return undefined;
  }, [selectedBook]);
  const handlePageChange = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      const selectedPageId = (selectedOption as SelectOption).value;
      if (selectedPageId) {
        setCurrentPage(selectedPageId - 1);
        console.log(selectedPageId);
        console.log(selectedPageId - 1);
        console.log(currentPage);
      }
    }
  };

  const onChange = (
    option: SelectOption | null,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (option) {
      handlePageChange(option);
    }
  };

  return (
    <>
      {options ? (
        <Select
          name='setpageid'
          id='setpageid'
          options={options}
          defaultValue={options[currentPage]}
          value={options.find((option) => option.value === currentPage)}
          onChange={onChange}
        />
      ) : null}
    </>
  );
}
