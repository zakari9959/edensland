import React from 'react';
import BibliList from '../components/BibliList/BibliList';
import CreateBook from '../components/CreateBook/CreateBook';
import './Bibli.css';

export default function Bibli() {
  return (
    <div className='bibli'>
      <h2>Ma Bibliothèque</h2>
      <CreateBook />
      <BibliList />
    </div>
  );
}
