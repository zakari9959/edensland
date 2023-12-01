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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const apiUrl = isLogin
    ? 'https://edensland-api.vercel.app/api/auth/login' // Route de connexion
    : 'https://edensland-api.vercel.app/api/auth/signup'; // Route d'inscription

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
        const responseData = await response.json();
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
        const responseData = await response.json();
        setErrorMessage(responseData.message);
        isLogin
          ? console.error('Erreur lors de la connexion')
          : console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };
  return (
    <form className='loginform' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>Email</label>
      <input type='email' {...register('email', { required: true })} />
      {errors.email && (
        <span className='loginform__error'>Insérez votre email</span>
      )}
      <label htmlFor='password'>Password</label>
      <input type='password' {...register('password', { required: true })} />
      {errors.password && (
        <span className='loginform__error'>Insérez votre mot de passe</span>
      )}
      <div className='loginform__buttons'>
        <button type='submit' onClick={() => setIsLogin(true)}>
          Connexion
        </button>
        ou
        <button type='submit' onClick={() => setIsLogin(false)}>
          Inscription
        </button>
      </div>
      {errorMessage && <span className='loginform__error'>{errorMessage}</span>}
    </form>
  );
}
