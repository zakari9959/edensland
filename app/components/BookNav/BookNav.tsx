import React from 'react';
import { BookNavProps } from '../../types';
import './BookNav.css';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { SelectOption } from '../../types';

function BookNav({ setSelectedBook, bookData }: BookNavProps) {
  const welcomemessage: string =
    "Bienvenue sur Eden's Land, l'application entièrement dédiée à la lecture pour enfants";

  const handleBookChange = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      const selectedBookId = (selectedOption as SelectOption).value;
      const selectedBook = bookData.find((book) => book.id === selectedBookId);
      if (selectedBook) {
        setSelectedBook(selectedBook);
      }
    }
  };
  const options: SelectOption[] = [
    ...bookData.map((book) => ({ value: book.id, label: book.title })),
  ];
  const onChange = (
    option: SelectOption | null,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    handleBookChange(option);
  };
  return (
    <section className='booknav'>
      <h2 className='booknav__desc'>{welcomemessage}</h2>
      <div className='booknav__selection'>
        <h3>Choisissez un livre :</h3>
        <Select
          name='setbookid'
          id='setbookid'
          options={options}
          defaultValue={options[0]}
          onChange={onChange}
        ></Select>
      </div>
    </section>
  );
}

export default BookNav;
