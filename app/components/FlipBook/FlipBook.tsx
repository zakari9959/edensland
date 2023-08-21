'use client';
import React, { useState, useEffect } from 'react';
import './FlipBook.css';
import books from '../../data/books.json';
import { MotionConfig, motion } from "framer-motion"
import { MotionCanvas, motion as motion3d } from "framer-motion-3d"

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
    return <div>Loading...</div>;
  }

  

  const numberOfPages: number = Math.ceil(selectedBook.text.length / 2);
  const isLastPage: boolean = currentPage === numberOfPages - 1;

  const nextPage = () => {
    if (currentPage < numberOfPages - 1 && !isFlippingRight) {
      setIsFlippingRight(true);
      
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlippingRight(null);
        setIsHalfway(true);
      }, 5100); // Adjust the timeout to match the transition duration
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlippingRight) {
      setIsFlippingRight(false);
      
      setTimeout(() => {
          setCurrentPage(currentPage - 1);
       
        setIsHalfway(true);
        setIsFlippingRight(null);
        
      }, 5100); // Adjust the timeout to match the transition duration
    }
  };
  

  return (<>   
   <div className={`book ${isFlippingRight ? 'flipping' : ''}`}>
      
      {/* Left page */}
    {/* Left page */}
    <motion.div
  className={`book__page book__page__left ${isHalfway ? 'book__page--hidden' : ''}` }
  initial={{ rotateY: 0, rotateZ: 0, x: '0%' }}
  animate={
    isFlippingRight === false // Animer seulement lorsque isFlippingRight est false
      ? { rotateY: 180, rotateZ: 0, x: '0%', zIndex: 8, transition: { duration: 5 } }
      : { rotateY: 0, rotateZ: 0, x: '0%', zIndex: 6 }
  }
  exit={{ rotateY: 180, rotateZ: 0, x: '0%', display: 'none', zIndex: 6 }}
  onAnimationComplete={() => setIsHalfway(false)}
  >
  <div className="book__page__content">
    <p>{selectedBook.text[currentPage * 2]}</p>
  </div>
</motion.div>

{/* Right page */}
<motion.div
  className={`book__page book__page__right ${isHalfway ? 'book__page--hidden' : ''}` }
  initial={{ rotateY: 0, rotateZ: 0, x: '0%' }}
  animate={
    isFlippingRight === true // Animer seulement lorsque isFlippingRight est true
      ? { rotateY: -180, rotateZ: 0, x: '0%', zIndex: 8, transition: { duration: 5 } }
      : { rotateY: 0, rotateZ: 0, x: '0%', zIndex: 6 }
  }
  exit={{ rotateY: -180, rotateZ: 0, x: '0%', display: 'none', zIndex: 6 }}
  onAnimationComplete={() => setIsHalfway(false)}
>
  <div className="book__page__content">
    <p>{selectedBook.text[currentPage * 2 + 1]}</p>
  </div>
</motion.div>

<motion.div
  className={`book__page book__page__left `}
  initial={{ rotateY: 0, rotateZ: 0, x: '0%', zIndex: 5 }}
>
  <div className="book__page__content">
  <p>
        {isHalfway ? selectedBook.text[currentPage * 2 - 2] : selectedBook.text[currentPage * 2]}
    </p>
    </div>
</motion.div>

{/* Right page */}
<motion.div
  className={`book__page book__page__right`}
  initial={{ rotateY: 0, rotateZ: 0, x: '0%', zIndex: 5 }}
>
  <div className="book__page__content">
    <p>{isFlippingRight ? selectedBook.text[currentPage * 2 - 2] : selectedBook.text[currentPage * 2]}</p>
  </div>
</motion.div>

<motion.div
  className={`book__page book__page__left ${isHalfway ? 'book__page--hidden' : ''}`}
  initial={{ rotateY: 180, rotateZ: 0, x: '0%', zIndex: 5 }}
  animate={
    isFlippingRight === false // Animer seulement lorsque isFlippingRight est true
      ? { rotateY: -180, rotateZ: 0, x: '0%', zIndex: 7, transition: { duration: 5 } }
      : { rotateY: 0, rotateZ: 0, x: '0%', zIndex: 5 }
  }
  exit={{ rotateY: -180, rotateZ: 0, x: '0%', display: 'none', zIndex: 5 }}
>
  <div className="book__page__content">
    <p>{selectedBook.text[currentPage * 2-2]}</p>
  </div>
</motion.div>

{/* Right page */}
<motion.div
  className={`book__page book__page__right ${isHalfway ? 'book__page--hidden' : ''}`}
  initial={{ rotateY: -180, rotateZ: 0, x: '0%', zIndex: 5 }}animate={
    isFlippingRight === true // Animer seulement lorsque isFlippingRight est false
      ? { rotateY: 180, rotateZ: 0, x: '0%', zIndex: 7, transition: { duration: 5 } }
      : { rotateY: 0, rotateZ: 0, x: '0%', zIndex: 5 }
  }
  exit={{ rotateY: 180, rotateZ: 0, x: '0%', display: 'none', zIndex: 5 }}
>
  <div className="book__page__content">
    <p>{selectedBook.text[currentPage * 2 + 3]}</p>
  </div>
</motion.div>
      <button onClick={prevPage} disabled={currentPage === 0}>
        Previous
      </button>
      <button onClick={nextPage} disabled={isLastPage}>
        Next
      </button>
    </div> </>
  );
};

export default FlipBook;
