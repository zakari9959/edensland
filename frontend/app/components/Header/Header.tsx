'use client';
import NavLink from 'next/link';
import React from 'react';
import WelcomeAnimation from '../WelcomeAnimation/WelcomeAnimation';
import './Header.css';
import { Page } from '../../types';
import { useUserIdContext } from '../../context/userIdContext';

export default function Header(): JSX.Element {
  const { userId, setUserId } = useUserIdContext();
  const title: string = "Eden's Land";
  const pages: Page[] = [
    { path: '/', title: 'Home' },
    { path: '/bibli', title: 'Ma Bibliothèque' },
    { path: `/reader`, title: 'Lecteur' },
    // Add more pages here if needed
  ];
  console.log(userId);
  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          <ul className='navbar'>
            {pages.map((page) => (
              <li key={page.path}>
                <NavLink href={page.path}>{page.title}</NavLink>
              </li>
            ))}
            {userId ? (
              <li>
                <NavLink href='/login'>Déconnexion</NavLink>
              </li>
            ) : (
              <li>
                <NavLink href='/login'>Login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <WelcomeAnimation />
    </>
  );
}
