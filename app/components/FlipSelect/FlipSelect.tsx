import React, { useMemo } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { SelectOption, FlipNavProps } from '../../types';

export default function FlipSelect(props: FlipNavProps) {
  const { selectedBook, currentPage, setCurrentPage } = props;
  const options: SelectOption[] | undefined = useMemo(() => {
    if (selectedBook && selectedBook.text) {
      return selectedBook.text.map((pagenb, index) => ({
        key: index + 1,
        value: index + 1,
        label: `Page ${index + 1}`,
      }));
    }
    return undefined;
  }, [selectedBook]);
  const handlePageChange = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      const selectedPageId = (selectedOption as SelectOption).value;
      if (selectedPageId) {
        props.setCurrentPage(selectedPageId - 1);
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
          name='setbookid'
          id='setbookid'
          options={options}
          defaultValue={options[currentPage]}
          onChange={onChange}
        />
      ) : null}
      ;
    </>
  );
}
