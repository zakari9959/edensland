'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserIdContextType } from '../types';

const UserIdContext = createContext<UserIdContextType | undefined>(undefined);

export const UserIdContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userId, setUserId] = useState(0);

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
