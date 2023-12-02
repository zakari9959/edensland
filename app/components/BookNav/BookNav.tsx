'use client';
import React from 'react';
import { BookNavProps } from '../../types';
import './BookNav.css';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { SelectOption } from '../../types';
import Image from 'next/image';
import { useSelectedBookContext } from '../../context/bookDataContext';
import { SelectedBookContextType } from '../../types';

function BookNav({ bookData }: BookNavProps) {
  const { selectedBook, setSelectedBook } = useSelectedBookContext();
  const welcomemessage: string =
    'Sélectionnez votre livre et commencez à lire:';

  const handleBookChange = (selectedOption: SingleValue<SelectOption>) => {
    if (selectedOption) {
      const selectedBookId = (selectedOption as SelectOption).value;
      const selectedBook = bookData.find((book) => book._id === selectedBookId);
      if (selectedBook) {
        setSelectedBook(selectedBook);
      }
    }
  };
  const options: SelectOption[] = [
    ...bookData.map((book) => ({ value: book._id, label: book.title })),
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
          onChange={onChange}
        ></Select>
      </div>
      {selectedBook && (
        <div className='booknav__cover'>
          <h3>{selectedBook.title}</h3>
          <Image
            className='booknav__cover'
            src={selectedBook.imageUrl}
            width={150}
            height={200}
            alt='Book Cover'
          />
        </div>
      )}
    </section>
  );
}

export default BookNav;
