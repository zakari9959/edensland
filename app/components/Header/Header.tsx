import Link from 'next/link';
import React from 'react';
import WelcomeAnimation from '../WelcomeAnimation/WelcomeAnimation';
import './Header.css';
import { Page } from '../../types';

export default function Header(): JSX.Element {
  const title: string = "Eden's Land";
  const pages: Page[] = [
    { path: '/', title: 'Home' },
    { path: '/bibli', title: 'Ma Bibliothèque' },
    { path: `/reader`, title: 'Lecteur' },
    // Add more pages here if needed
  ];

  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          <ul className='navbar'>
            {pages.map((page) => (
              <li key={page.path}>
                <Link href={page.path}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <WelcomeAnimation />
    </>
  );
}
