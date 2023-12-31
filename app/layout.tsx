import './globals.css';
import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import Header from './components/Header/Header';
import { SelectedBookContextProvider } from './context/bookDataContext';
import { UserIdContextProvider } from './context/userIdContext';

const fredoka = Fredoka({ subsets: ['latin'], display: 'block' });

export const metadata: Metadata = {
  title: "Eden's Land - Des aventures infinies à portée de doigt !",
  description: 'Une application web entièrement dédié aux enfants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body className={fredoka.className}>
        <UserIdContextProvider>
          <Header />
          <SelectedBookContextProvider>{children}</SelectedBookContextProvider>
        </UserIdContextProvider>
      </body>
    </html>
  );
}
