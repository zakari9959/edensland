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
  const [loading, setLoading] = useState(true);
  const token = localStorage ? localStorage.getItem('token') : null;
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
          setBooks(data);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête :', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);
  const handleDeleteBook = (bookId: number) => {
    if (token) {
      fetch(`http://localhost:4000/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('La suppression a échoué.');
          }
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book._id !== bookId)
          );
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression :', error);
        });
    }
  };

  return (
    <div className='bibli'>
      <div className='bibli__flex'>
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div className='biblilist'>
            {books && books.length > 0 ? (
              books.map((book) => (
                <div key={book._id} className='biblilist__book'>
                  <Link
                    href={'/reader'}
                    className='biblilist__book__link'
                    onClick={() => setSelectedBook(book)}
                  >
                    <h3>{book.title}</h3>
                    <Image
                      className='biblilist__book__img'
                      width={100}
                      height={150}
                      src={book.imageUrl}
                      alt='Book Cover'
                    />
                  </Link>
                  <button
                    className='biblilist__book__button'
                    onClick={() => handleDeleteBook(book._id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))
            ) : (
              <p>Aucun livre disponible</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
