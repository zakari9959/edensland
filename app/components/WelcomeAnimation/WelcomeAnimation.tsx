'use client'
import React, { useState, useEffect } from 'react';
import  './WelcomeAnimation.css';

const WelcomeAnimation: React.FC = () => {
    const title: string = "Eden's Land";
    const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // Durée de l'animation en millisecondes

    return () => clearTimeout(timer);
  }, []);

  if (animationComplete) {
    return null; // Retourne null pour que le composant soit retiré du DOM
  }


  return (
    <div className="animation">
      <h1>{title}</h1>
    </div>
  );
};

export default WelcomeAnimation;