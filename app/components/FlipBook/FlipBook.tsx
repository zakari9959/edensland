'use client';
import React, { useState } from 'react';
import './FlipBook.css';
import books from '../../data/books.json';
import { motion } from "framer-motion"

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
  const [isFlippingRight, setIsFlippingRight] = useState<boolean | null>(null);
  const [isHalfway, setIsHalfway] = useState(false);

  const selectedBook: Book | undefined = books.find((book) => book.id === bookId);

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
const TRANSITION_DELAY = 500;
const HALFWAY_DELAY = 1000;
  const nextPage = () => {
    if (currentPage < numberOfPages - 1 && !isFlippingRight) {
      setIsFlippingRight(true);
      setTimeout(() => {
        setIsHalfway(true);
        setTimeout(() => {
          setIsFlippingRight(null);
          setCurrentPage(currentPage + 1);
          setIsHalfway(false);
        }, HALFWAY_DELAY); // Transition duration + additional delay
      }, TRANSITION_DELAY);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0 && !isFlippingRight) {
      setIsFlippingRight(false);
      setTimeout(() => {
        setIsHalfway(true);
        setTimeout(() => {
          setIsFlippingRight(null);
          setCurrentPage(currentPage - 1);
          setIsHalfway(false);
        }, 1000); // Transition duration + additional delay
      }, 500);
    }
  };
  console.log(isFlippingRight);
  console.log(isHalfway);
  return (<>   
   <div className={`book ${isFlippingRight ? 'flipping' : ''}`}>
    <motion.div
  className={`book__page ${isHalfway ? 'book__page--hidden' : ''}` }
  initial={{ ...animationCommon }}
  animate={ isHalfway === true
    ? {
      ...animationCommon,
        opacity: 1,
        transition: { duration: 0 }
      }
    :  isFlippingRight === true
      ? {
          rotateY: -180,
          rotateZ: 0, 
          x: '-100%',
          zIndex: 8,
          opacity: 0,
          transition: { duration: ANIMATION_DURATION }
        }
      : isFlippingRight === false
      ? {
          rotateY: 180,
          rotateZ: 0,  
          x: '100%',
          zIndex: 8,
          opacity: 0,
          transition: { duration: ANIMATION_DURATION }
        }      
       : isFlippingRight === null
        ? {
            rotateY: 0,
            rotateZ: 0,
            x: '0%',
            zIndex: 8,
            opacity: 1
          }
        : { ...animationCommon}}
  exit={{ ...animationCommon, display: 'none'}}
  onAnimationComplete={() => {
    if (isFlippingRight === null) {
      setIsHalfway(false);
    }
  }}
  >
  <div className="book__page__content">
    <p>{selectedBook.text[currentPage]}</p>
  </div>
</motion.div>
<motion.div
 className={`book__page ${isFlippingRight === null ? 'book__page--hidden' : ''}` }
   initial={{...animationCommon ,zIndex: 7 }}
  >
  <div className="book__page__content">
    <p> {isFlippingRight === true ? selectedBook.text[currentPage + 1] : selectedBook.text[currentPage - 1]}</p>
  </div>
</motion.div>
      <button onClick={prevPage} disabled={currentPage === 0 || isFlippingRight === false || isFlippingRight === true}>
        Previous
      </button>
      <button onClick={nextPage} disabled={isLastPage || isFlippingRight === false || isFlippingRight === true}>
        Next
      </button>
    </div> </>
  );
};

export default FlipBook;
