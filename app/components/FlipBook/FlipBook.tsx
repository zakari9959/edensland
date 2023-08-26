'use client';
import React, { useState, useEffect, useMemo } from 'react';
import './FlipBook.css';
import books from '../../data/books.json';
import { motion } from 'framer-motion';
import { Book, FlipBookProps } from '../../types';
import FlipNav from '../FlipNav/FlipNav';

const FlipBook: React.FC<FlipBookProps> = ({ bookId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlippingRight, setIsFlippingRight] = useState<boolean | null>(null);
  const [isHalfway, setIsHalfway] = useState(false);

  const selectedBook: Book | undefined = books.find(
    (book) => book.id === bookId
  );

  if (!selectedBook) {
    return <div>Error: Book not found.</div>;
  }

  const numberOfPages: number = selectedBook.text.length;
  const isLastPage: boolean = currentPage === numberOfPages - 1;
  const animationCommon = {
    rotateY: 0,
    rotateZ: 0,
    x: '0%',
    zIndex: 8,
  };
  const ANIMATION_DURATION = 0.8;
  const props = {
    bookId: bookId,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    isFlippingRight: isFlippingRight,
    setIsFlippingRight: setIsFlippingRight,
    numberOfPages: numberOfPages,
    setIsHalfway: setIsHalfway,
    isLastPage: isLastPage,
    selectedBook: selectedBook,
  };

  return (
    <>
      <FlipNav {...props} />
      <div className={`book ${isFlippingRight ? 'flipping' : ''}`}>
        <motion.div
          className={`book__page ${isHalfway ? 'book__page--hidden' : ''}`}
          initial={{ ...animationCommon }}
          animate={
            isHalfway === true
              ? {
                  ...animationCommon,
                  opacity: 1,
                  transition: { duration: 0 },
                }
              : isFlippingRight === true
              ? {
                  rotateY: -180,
                  rotateZ: 0,
                  x: '-100%',
                  zIndex: 8,
                  opacity: 0,
                  transition: { duration: ANIMATION_DURATION },
                }
              : isFlippingRight === false
              ? {
                  rotateY: 180,
                  rotateZ: 0,
                  x: '100%',
                  zIndex: 8,
                  opacity: 0,
                  transition: { duration: ANIMATION_DURATION },
                }
              : isFlippingRight === null
              ? {
                  rotateY: 0,
                  rotateZ: 0,
                  x: '0%',
                  zIndex: 8,
                  opacity: 1,
                }
              : { ...animationCommon }
          }
          exit={{ ...animationCommon, display: 'none' }}
          onAnimationComplete={() => {
            if (isFlippingRight === null) {
              setIsHalfway(false);
            }
          }}
        >
          <div className='book__page__content'>
            <p>{selectedBook.text[currentPage]}</p>
          </div>
        </motion.div>
        <motion.div
          className={`book__page ${
            isFlippingRight === null ? 'book__page--hidden' : ''
          }`}
          initial={{ ...animationCommon, zIndex: 7 }}
        >
          <div className='book__page__content'>
            <p>
              {' '}
              {isFlippingRight === true
                ? selectedBook.text[currentPage + 1]
                : selectedBook.text[currentPage - 1]}
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FlipBook;
