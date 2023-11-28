'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import WelcomeAnimation from '../WelcomeAnimation/WelcomeAnimation';
import './Header.css';
import { Page } from '../../types';
import Image from 'next/image';
import { useUserIdContext } from '../../context/userIdContext';

export default function Header(): JSX.Element {
  const { userId, setUserId } = useUserIdContext();

  const title: string = "Eden's Land";
  const pages: Page[] = [
    { path: '/', title: 'Accueil' },
    { path: '/bibli', title: 'Bibliothèque' },
    { path: `/reader`, title: 'Lecteur' },
    // Ajoutez plus de pages ici si nécessaire
  ];
  return (
    <>
      <header>
        <div className='header__name'>
          <Image
            src='/assets/logo-edensland.png'
            className='header__name__logo'
            width={50}
            height={50}
            alt='Logo de livres, Edensland Des aventures infinies à portée de doigts'
          />
          <h1>{title}</h1>
        </div>
        <nav>
          <ul className='navbar'>
            {pages.map((page) => (
              <li key={page.path}>
                <span className='underline'>
                  <Link href={page.path}>{page.title}</Link>
                </span>
              </li>
            ))}
            {userId !== null ? (
              <li>
                <span className='underline'>
                  <Link
                    href='/login'
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('userId');
                      setUserId(null);
                    }}
                  >
                    Déconnexion
                  </Link>
                </span>
              </li>
            ) : (
              <li>
                <span className='underline'>
                  <Link href='/login'>Connexion</Link>
                </span>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <WelcomeAnimation />
    </>
  );
}
