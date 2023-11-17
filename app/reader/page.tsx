'use client';
import FlipBook from '@/app/components/FlipBook/FlipBook';
import React, { useState, useEffect } from 'react';
import BookNav from '@/app/components/BookNav/BookNav';
import '../components/FlipBook/FlipBook.css';
import { CurrentPageContextProvider } from '../context/currentPageContext';
import { Book } from '@/app/types';
export default function Reader() {
  const [bookData, setBookData] = useState<Book[]>([]);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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
          // Traitez la réponse réussie ici
          return response.json(); // Ajout pour obtenir les données JSON
        })
        .then((data) => {
          setBookData(data); // Mettez à jour les livres avec les données reçues
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
