'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import FlipBook from './components/FlipBook/FlipBook';
import bookData from './data/books.json';
import BookNav from './components/BookNav/BookNav';
import { Book } from './types';
import Link from 'next/link';

export default function Home() {
  const bookDataContext = createContext(bookData);

  return (
    <main>
      <Link href='/bibli'>
        <h2>Une blibliothèque personnelle avec 5 livres prédéfinis</h2>
        <p>
          Vous pourrez ajouter, modifier ou supprimer les livres que vous aurez
          ajouter
        </p>
      </Link>
      <Link href='/reader'>
        <h2>Le lecteur de livres</h2>
        <p>
          Vous aurez accès à un lecteur de livres qui vous permettra de lire
          tout les livres que vous auraient ajouter à votre bibliothèques
        </p>
      </Link>
    </main>
  );
}
