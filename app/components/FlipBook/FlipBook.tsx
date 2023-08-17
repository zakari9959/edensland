'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import './FlipBook.css';
import books from '../../data/books.json';

interface Book {
  id: number;
  age: string;
  title: string;
  text: string[];
}

interface FlipBookProps {
  bookId: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ bookId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const selectedBook = books.find((book) => book.id === bookId);

  if (!selectedBook) {
    return <div>Loading...</div>;
  }

  const numberOfPages: number = Math.ceil(selectedBook.text.length / 2);
  const isLastPage:boolean = currentPage === numberOfPages - 1;

  const nextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box className="book">
      {/* Left page */}
      <div
        className="book__page left-page"
        style={{
          backgroundImage: `url('/path/to/your/page-bg-${currentPage * 2 + 1}.jpg')`,
        }}
      >
        <div className="book__page__content">
          <p>{selectedBook.text[currentPage * 2]}</p>
        </div>
      </div>

      {/* Right page */}
      {!isLastPage && (
        <div
          className="book__page right-page"
          style={{
            backgroundImage: `url('/path/to/your/page-bg-${currentPage * 2 + 2}.jpg')`,
          }}
        >
          <div className="book__page__content">
            <p>{selectedBook.text[currentPage * 2 + 1]}</p>
          </div>
        </div>
      )}

      <button onClick={prevPage} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={nextPage} disabled={isLastPage}>
        Next
      </button>
    </Box>
  );
};

export default FlipBook;