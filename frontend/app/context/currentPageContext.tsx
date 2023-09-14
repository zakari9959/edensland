'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { CurrentPageContextType, Book } from '../types';
import bookData from '../data/books.json';

const CurrentPageContext = createContext<CurrentPageContextType | undefined>(
  undefined
);

export const CurrentPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};

export const useCurrentPageContext = (): CurrentPageContextType => {
  const context = useContext(CurrentPageContext);
  if (!context) {
    throw new Error(
      'useCurrentPageContext must be used within a CurrentPageContextProvider'
    );
  }
  return context;
};
