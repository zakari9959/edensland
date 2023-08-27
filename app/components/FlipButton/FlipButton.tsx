import React from 'react';
import { FlipNavProps } from '../../types';
import { useCurrentPageContext } from '../../context/currentPageContext';

export default function FlipButton({
  numberOfPages,
  setIsFlippingRight,
  setIsHalfway,
  isFlippingRight,
  isLastPage,
  isCoverPageVisible,
  setIsCoverPageVisible,
}: FlipNavProps) {
  const { currentPage, setCurrentPage } = useCurrentPageContext();
  const TRANSITION_DELAY = 500;
  const HALFWAY_DELAY = 1000;
  const updatePage = (newPage: number, isFlippingRight: boolean | null) => {
    setIsFlippingRight(isFlippingRight);
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
        onClick={() =>
          isCoverPageVisible ? setIsCoverPageVisible(false) : nextPage()
        }
        disabled={
          isLastPage || isFlippingRight === false || isFlippingRight === true
        }
      >
        Next
      </button>
      <button
        onClick={() => {
          setIsCoverPageVisible(true);
          setCurrentPage(0);
        }}
        disabled={isCoverPageVisible}
      >
        Close
      </button>
    </div>
  );
}
