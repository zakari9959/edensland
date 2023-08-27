'use client';
import React from 'react';
import bookData from '../../data/books.json';
import Image from 'next/image';
import { Book } from '../../types';
import './BibliList.css';
import { useSelectedBookContext } from '../../context/bookDataContext';
import Link from 'next/link';

export default function BibliList() {
  const { selectedBook, setSelectedBook } = useSelectedBookContext();
  function onClick() {
    if (selectedBook) {
      setSelectedBook(selectedBook);
    }
  }
  return (
    <div className='bibli'>
      <h2>Ma Bibliothèque</h2>
      <div className='biblilist'>
        {bookData.map((book: Book) => (
          <Link
            className='biblilist__book'
            key={book.id}
            href={'reader'}
            onClick={onClick}
          >
            <h3>{book.title}</h3>
            <Image
              className='biblilist__img'
              key={book.id}
              width={100}
              height={150}
              src={`/assets/bookcover${book.id}.webp`}
              alt='Book Cover'
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
