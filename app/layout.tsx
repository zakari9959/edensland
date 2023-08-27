import './globals.css';
import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import Header from './components/Header/Header';
import { SelectedBookContextProvider } from './context/bookDataContext';

const fredoka = Fredoka({ subsets: ['latin'], display: 'block' });

export const metadata: Metadata = {
  title: 'Edens Land',
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
        <Header />
        <SelectedBookContextProvider>{children}</SelectedBookContextProvider>
      </body>
    </html>
  );
}
