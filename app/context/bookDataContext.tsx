'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { SelectedBookContextType, Book } from '../types';

const SelectedBookContext = createContext<SelectedBookContextType | undefined>(
  undefined
);

export const SelectedBookContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    fetch('https://edensland-api.vercel.app/api/books', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setBookData(data);
        setSelectedBook(data[0]);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données depuis l'API :",
          error
        );
      });
  }, []);
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
