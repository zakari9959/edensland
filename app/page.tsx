'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import FlipBook from './components/FlipBook/FlipBook';
import bookData from './data/books.json';
import BookNav from './components/BookNav/BookNav';
import { Book } from './types';

export default function Home() {
  const bookDataContext = createContext(bookData);

  return <main></main>;
}
