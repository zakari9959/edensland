'use client';
import FlipBook from '@/app/components/FlipBook/FlipBook';
import React, { useState, useEffect } from 'react';
import BookNav from '@/app/components/BookNav/BookNav';
import '../components/FlipBook/FlipBook.css';
import { CurrentPageContextProvider } from '../context/currentPageContext';
import { Book } from '@/app/types';
export default function Reader() {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:4000/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('La requête a échoué.');
          }
          return response.json();
        })
        .then((data) => {
          setBookData(data);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête :', error);
        });
    }
  }, [token]);
  return (
    <main className='reader'>
      <BookNav bookData={bookData} />
      <CurrentPageContextProvider>
        <FlipBook />
      </CurrentPageContextProvider>
    </main>
  );
}
