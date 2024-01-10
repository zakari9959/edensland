'use client';
import React, { useState, useEffect, useMemo } from 'react';
import './FlipBook.css';
import { motion } from 'framer-motion';
import { FlipBookProps } from '../../types';
import FlipNav from '../FlipNav/FlipNav';
import Image from 'next/image';
import { useSelectedBookContext } from '../../context/bookDataContext';
import { useCurrentPageContext } from '../../context/currentPageContext';

const FlipBook: React.FC<FlipBookProps> = () => {
  const { currentPage, setCurrentPage } = useCurrentPageContext();
  const [isFlippingRight, setIsFlippingRight] = useState<boolean | null>(null);
  const [isHalfway, setIsHalfway] = useState(false);
  const [isCoverPageVisible, setIsCoverPageVisible] = useState(true);
  const { selectedBook } = useSelectedBookContext();

  if (!selectedBook) {
    return (
      <div className='notselectedbook'>
        Veuillez choisir un livre ou connectez vous
      </div>
    );
  }
  const numberOfPages: number = selectedBook.text.length;
  const isLastPage: boolean = currentPage === numberOfPages - 1;
  const animationCommon = {
    rotateY: 0,
    rotateZ: 0,
    x: '0%',
    zIndex: 8,
  };
  const ANIMATION_DURATION = 1;
  const props = {
    isFlippingRight: isFlippingRight,
    setIsFlippingRight: setIsFlippingRight,
    numberOfPages: numberOfPages,
    setIsHalfway: setIsHalfway,
    isLastPage: isLastPage,
    isCoverPageVisible: isCoverPageVisible,
    setIsCoverPageVisible: setIsCoverPageVisible,
  };
  return (
    <div className='flipbook'>
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
            {isCoverPageVisible ? (
              selectedBook.imageUrl ? (
                <Image
                  width={400}
                  height={600}
                  src={selectedBook.imageUrl}
                  alt='Book Cover'
                />
              ) : (
                <p>{selectedBook.title}</p>
              )
            ) : (
              <p>{selectedBook.text[currentPage]}</p>
            )}
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
    </div>
  );
};

export default FlipBook;
