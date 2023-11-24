import React from 'react';
import Link from 'next/link';
import './HomeLinks.css';

export default function HomeLinks() {
  return (
    <div className='homelinks'>
      <Link href='/bibli'>
        <h2>Votre Bibliothèque</h2>
        <p>
          Vous pourrez ajouter, modifier ou supprimer les livres que vous aurez
          ajouter
        </p>
      </Link>
      <Link href='/reader'>
        <h2>Lecteur</h2>
        <p>
          Vous aurez accès à un lecteur de livres qui vous permettra de lire
          tout les livres que vous auraient ajouter à votre bibliothèques
        </p>
      </Link>
      <Link href='/login'>
        <h2>Inscription & Connexion</h2>
        <p>
          Connectez-vous avec une adresse mail et un mot de passe pour accéder à
          votre bibliothèque.
        </p>
      </Link>
    </div>
  );
}
