'use client';
import React, { useState } from 'react';
import './LoginForm.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useUserIdContext } from '@/app/context/userIdContext';

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { userId, setUserId } = useUserIdContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const apiUrl = isLogin
    ? 'http://localhost:4000/api/auth/login' // Route de connexion
    : 'http://localhost:4000/api/auth/signup'; // Route d'inscription

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Gérer la réponse réussie ici
        const responseData = await response.json(); // Récupérer la réponse au format JSON
        const token = responseData.token;
        const userId = responseData.userId;
        isLogin
          ? (console.log('Connexion réussie !'),
            localStorage.setItem('token', token),
            localStorage.setItem('userId', userId),
            setUserId(userId))
          : console.log('Inscription réussie !');
        router.push('/bibli');
      } else {
        // Gérer les erreurs ici
        isLogin
          ? console.error('Erreur lors de la connexion')
          : console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };
  return (
    /* "handleSubmit" validera vos saisies avant d'appeler "onSubmit" */
    <form className='loginform' onSubmit={handleSubmit(onSubmit)}>
      {/* Enregistrez votre champ en utilisant la fonction "register" */}
      <label htmlFor='email'>Email</label>
      <input type='email' {...register('email', { required: true })} />
      {/* Affichez un message d'erreur si la validation échoue */}
      {errors.email && <span>This field is required</span>}
      <label htmlFor='password'>Password</label>
      <input type='password' {...register('password', { required: true })} />
      {errors.password && <span>This field is required</span>}
      <div className='loginform__buttons'>
        <button type='submit' onClick={() => setIsLogin(true)}>
          Connexion
        </button>
        ou
        <button type='submit' onClick={() => setIsLogin(false)}>
          Inscription
        </button>
      </div>
    </form>
  );
}
