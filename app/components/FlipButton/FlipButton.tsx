import React from 'react';
import { FlipNavProps } from '../../types';
import { useCurrentPageContext } from '../../context/currentPageContext';
import './FlipButton.css';
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
      }, HALFWAY_DELAY);
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
    <div className='flipbuttons'>
      <button
        onClick={() => {
          setIsCoverPageVisible(true);
          setCurrentPage(0);
        }}
        disabled={
          isCoverPageVisible ||
          isFlippingRight === false ||
          isFlippingRight === true
        }
      >
        X
      </button>
      <div className='flipbuttons__navbuttons'>
        <button
          onClick={() =>
            isCoverPageVisible ? setIsCoverPageVisible(false) : prevPage()
          }
          disabled={
            currentPage === 0 ||
            isFlippingRight === false ||
            isFlippingRight === true
          }
        >
          Prev
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
      </div>
    </div>
  );
}
