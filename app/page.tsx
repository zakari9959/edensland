'use client';
import React, { useState } from 'react';
import FlipBook from './components/FlipBook/FlipBook';
import bookData from './data/books.json';
import BookNav from './components/BookNav/BookNav';
import { Book } from './types';

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book>(bookData[0]);

  return (
    <main>
      <BookNav setSelectedBook={setSelectedBook} bookData={bookData} />
      <FlipBook bookId={selectedBook.id} text={selectedBook.text} />
    </main>
  );
}
