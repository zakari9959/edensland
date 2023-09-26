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
    "Bienvenue sur Eden's Land, l'application entièrement dédiée à la lecture pour enfants";

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
      {selectedBook && (
        <Image
          className='booknav__cover'
          src={selectedBook.imageUrl}
          width={150}
          height={200}
          alt='Book Cover'
        />
      )}
      <div className='booknav__selection'>
        {' '}
        <h3>Choisissez un livre :</h3>
        <Select
          className='booknav__selection__select'
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
