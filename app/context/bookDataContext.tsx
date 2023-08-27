'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { SelectedBookContextType, Book } from '../types';
import bookData from '../data/books.json';

const SelectedBookContext = createContext<SelectedBookContextType | undefined>(
  undefined
);

export const SelectedBookContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedBook, setSelectedBook] = useState<Book>(bookData[0]);

  return (
    <SelectedBookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </SelectedBookContext.Provider>
  );
};

export const useSelectedBookContext = (): SelectedBookContextType => {
  const context = useContext(SelectedBookContext);
  if (!context) {
    throw new Error(
      'useSelectedBookContext must be used within a SelectedBookContextProvider'
    );
  }
  return context;
};
