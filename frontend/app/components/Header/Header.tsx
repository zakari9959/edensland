'use client';
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import Link from 'next/link';
=======
import NavLink from 'next/link';
>>>>>>> 58b512ad1f64d5e0d04bf94eefeed885c54fe2a5
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
    { path: '/bibli', title: 'Ma Bibliothèque' },
    { path: `/reader`, title: 'Lecteur' },
    // Ajoutez plus de pages ici si nécessaire
  ];
  console.log(userId);
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
<<<<<<< HEAD
                  <Link href={page.path}>{page.title}</Link>
=======
                  <NavLink href={page.path}>{page.title}</NavLink>
>>>>>>> 58b512ad1f64d5e0d04bf94eefeed885c54fe2a5
                </span>
              </li>
            ))}
            {userId !== '0' ? (
              <li>
                <span className='underline'>
<<<<<<< HEAD
                  <Link
=======
                  <NavLink
>>>>>>> 58b512ad1f64d5e0d04bf94eefeed885c54fe2a5
                    href='/login'
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('userId');
                      setUserId('0');
                    }}
                  >
                    Déconnexion
<<<<<<< HEAD
                  </Link>
=======
                  </NavLink>
>>>>>>> 58b512ad1f64d5e0d04bf94eefeed885c54fe2a5
                </span>
              </li>
            ) : (
              <li>
                <span className='underline'>
<<<<<<< HEAD
                  <Link href='/login'>Connexion</Link>
=======
                  <NavLink href='/login'>Connexion</NavLink>
>>>>>>> 58b512ad1f64d5e0d04bf94eefeed885c54fe2a5
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
