import React from 'react';
import { FlipNavProps } from '../../types';

export default function FlipButton({
  currentPage,
  numberOfPages,
  setIsFlippingRight,
  setIsHalfway,
  isFlippingRight,
  setCurrentPage,
  isLastPage,
}: FlipNavProps) {
  const TRANSITION_DELAY = 500;
  const HALFWAY_DELAY = 1000;
  const updatePage = (newPage: number, flippingRight: boolean | null) => {
    setIsFlippingRight(flippingRight);
    setTimeout(() => {
      setIsHalfway(true);
      setTimeout(() => {
        setIsFlippingRight(null);
        setCurrentPage(newPage);
        setIsHalfway(false);
      }, HALFWAY_DELAY); // Transition duration + additional delay
    }, TRANSITION_DELAY);
  };

  const nextPage = () => {
    if (currentPage < numberOfPages - 1 && !isFlippingRight) {
      updatePage(currentPage + 1, true);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlippingRight) {
      updatePage(currentPage - 1, false);
    }
  };

  return (
    <div>
      <button
        onClick={prevPage}
        disabled={
          currentPage === 0 ||
          isFlippingRight === false ||
          isFlippingRight === true
        }
      >
        Previous
      </button>
      <button
        onClick={nextPage}
        disabled={
          isLastPage || isFlippingRight === false || isFlippingRight === true
        }
      >
        Next
      </button>
    </div>
  );
}
