'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { UserIdContextType } from '../types';

const UserIdContext = createContext<UserIdContextType | undefined>(undefined);

export const UserIdContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const newUserId = localStorage.getItem('userId');
    if (newUserId) {
      setUserId(newUserId);
    }
  }, [userId]);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserIdContext = (): UserIdContextType => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error(
      'useUserIdContext must be used within a UserIdContextProvider'
    );
  }
  return context;
};
