import React from 'react';
import Link from 'next/link';
import './HomeLinks.css';
import Image from 'next/image';

export default function HomeLinks() {
  const imgwidth = 612;
  const imgheight = 412;
  return (
    <div className='homelinks'>
      <Link href='/login' className='homelink'>
        <div className='homelink__desc'>
          <Image
            className='homelink__desc__img'
            src='/assets/imagelandingpage.webp'
            alt='Logo de livres'
            width={imgwidth}
            height={imgheight}
          />
          <div className='homelink__desc__text'>
            <h2>
              Bienvenue dans Eden's Land
              <br /> Libérez votre créativité littéraire !
            </h2>
            <p>
              Êtes-vous prêt à donner vie à vos idées et à créer des histoires
              captivantes? Notre générateur de livres intuitif et gratuit vous
              offre une expérience sans pareille, vous permettant de concevoir
              des récits uniques en un clin d'œil.
            </p>
            <div className='homelink__desc__text__btn'>
              Inscrivez-vous maintenant pour commencer
            </div>
          </div>
        </div>
      </Link>
      <Link href='/login' className='homelink'>
        <div className='homelink__desc homelink__desc--reverse'>
          <Image
            className='homelink__desc__img'
            src='/assets/bibli-screen.webp'
            alt='Logo de livres'
            width={imgwidth}
            height={imgheight}
          />
          <div className='homelink__desc__text'>
            <h2>
              Comment commencer?
              <br /> C'est facile !
            </h2>
            <p>
              Inscrivez-vous puis commencez à créer vos histoires personnalisés,
              indiquez simplement ce que vous souhaitez dans votre histoire et
              lisez la dans le lecteur.
            </p>
            <div className='homelink__desc__text__btn'>
              Commencez à créer maintenant
            </div>
          </div>
        </div>
      </Link>
      <video className='homelink__video' muted>
        Votre navigateur ne supporte pas les vidéos
        <source src='/assets/edensland.mp4' type='video/mp4' />
      </video>
    </div>
  );
}
