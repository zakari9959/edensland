'use client';
import FlipBook from '@/app/components/FlipBook/FlipBook';
import React from 'react';
import bookData from '@/app/data/books.json';
import BookNav from '@/app/components/BookNav/BookNav';
import '../components/FlipBook/FlipBook.css';
import { CurrentPageContextProvider } from '../context/currentPageContext';

export default function Reader() {
  return (
    <main className='reader'>
      <BookNav bookData={bookData} />
      <CurrentPageContextProvider>
        <FlipBook />
      </CurrentPageContextProvider>
    </main>
  );
}
