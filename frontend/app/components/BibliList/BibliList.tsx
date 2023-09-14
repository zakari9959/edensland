'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Book } from '../../types';
import './BibliList.css';
import { useSelectedBookContext } from '../../context/bookDataContext';
import Link from 'next/link';
import CreateBook from '../CreateBook/CreateBook';

export default function BibliList() {
  const { selectedBook, setSelectedBook } = useSelectedBookContext();
  const [books, setBooks] = useState<Book[]>([]);
  const token = localStorage.getItem('token');

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
          setBooks(data); // Mettez à jour les livres avec les données reçues
        })
        .catch((error) => {
          console.error('Erreur lors de la requête :', error);
        });
    }
  }, [token]);

  function onClick() {
    if (selectedBook) {
      setSelectedBook(selectedBook);
    }
  }

  return (
    <div className='bibli'>
      <h2>Ma Bibliothèque</h2>
      <div className='biblilist'>
        {books && books.length > 0 ? (
          books.map((book) => (
            <Link
              className='biblilist__book'
              key={book.id} // Utilisez book.id comme clé unique
              href={'/reader'} // Assurez-vous d'inclure l'ID du livre dans l'URL
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
          ))
        ) : (
          <p>Aucun livre disponible</p>
        )}
      </div>
      <CreateBook />
    </div>
  );
}
