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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Initialisez-le à undefined au début

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    fetch('http://localhost:4000/api/books', {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setBookData(data);
        setSelectedBook(data[0]);
        // Mettez à jour selectedBook ici avec la première donnée
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
