import React from 'react'
import FlipBook from './components/FlipBook/FlipBook';
export default function Home() {
  const welcomemessage:string = "Bienvenue sur Eden's Land, l'application entièrement dédié à la lecture pour enfants";
  const bookId:number = 1;
  console.log(bookId);
    return (
    <main>
      <h2>{welcomemessage}</h2>
      <FlipBook bookId={bookId} />
    </main>
  )
}
