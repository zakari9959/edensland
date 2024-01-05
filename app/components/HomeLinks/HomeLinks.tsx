import React from 'react';
import Link from 'next/link';
import './HomeLinks.css';
import Image from 'next/image';

export default function HomeLinks() {
  const imgwidth = 250;
  const imgheight = 100;
  return (
    <div className='homelinks'>
      <Link href='/bibli' className='homelink'>
        {/* <Image
          className='homelink__img'
          src='/assets/logo-edensland.png'
          alt='Logo de livres'
          width={imgwidth}
          height={imgheight}
        /> */}
        <div className='homelink__desc'>
          <h2>Votre Bibliothèque</h2>
          <p>
            Vous pourrez ajouter, modifier ou supprimer les livres que vous
            aurez ajouter
          </p>
        </div>
      </Link>
      <Link href='/reader' className='homelink'>
        {/*  <Image
          className='homelink__img'
          src='/assets/logo-edensland.png'
          alt='Logo de livres'
          width={imgwidth}
          height={imgheight}
        /> */}
        <div className='homelink__desc'>
          <h2>Lecteur</h2>
          <p>
            Vous aurez accès à un lecteur de livres qui vous permettra de lire
            tout les livres que vous auraient ajouter à votre bibliothèques
          </p>
        </div>
      </Link>
      <Link href='/login' className='homelink'>
        {/* <Image
          className='homelink__img'
          src='/assets/logo-edensland.png'
          alt='Logo de livres'
          width={imgwidth}
          height={imgheight}
        /> */}
        <div className='homelink__desc'>
          <h2>Inscription & Connexion</h2>
          <p>
            Connectez-vous avec une adresse mail et un mot de passe pour accéder
            à votre bibliothèque.
          </p>
        </div>
      </Link>
    </div>
  );
}
