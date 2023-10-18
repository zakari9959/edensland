'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './CreateBook.css';
import GptText from '../GptText/GptText';

type Inputs = {
  userId: number;
  title: string;
  age: string;
  imageUrl: FileList;
  personnageDescription: string;
  text: string;
};

export default function CreateBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const book = {
        userId: userId,
        title: data.title,
        age: data.age,
        personnageDescription: data.personnageDescription,
        text: data.text,
      };
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('book', JSON.stringify(book));

      if (data.imageUrl.length > 0) {
        formDataToSubmit.append('imageUrl', data.imageUrl[0]);
      }
      formDataToSubmit.forEach((value, key) => {
        console.log(`Clé: ${key}, Valeur: ${value}`);
      });
      console.log(JSON.stringify(formDataToSubmit));
      const response = await fetch('http://localhost:4000/api/books', {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`, // Utilisez l'en-tête Authorization pour envoyer le token
        },
        body: formDataToSubmit,
      });

      if (response.ok) {
        console.log('Livre créé avec succès');
        // Réinitialisez le formulaire ici
      } else {
        console.error('Erreur lors de la création du livre');
      }
    } catch (error) {
      console.error('Erreur lors de la création du livre :', error);
    }
  };

  return (
    <div className='create__book'>
      <h2>Créez un nouveau livre</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Titre:</label>
          <input type='text' {...register('title', { required: true })} />
          {errors.title && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>Âge:</label>
          <select {...register('age', { required: true })}>
            <option value='0-3'>0-3 ans</option>
            <option value='4-6'>4-6 ans</option>
            <option value='7-9'>7-9 ans</option>
            <option value='10+'>10 ans et plus</option>
          </select>
          {errors.age && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>Image:</label>
          <input type='file' accept='image/*' {...register('imageUrl')} />
        </div>
        <div>
          <label>Description du personnage:</label>
          <input
            type='text'
            {...register('personnageDescription', { required: true })}
          />
          {errors.personnageDescription && <span>Ce champ est requis</span>}
        </div>
        <div>
          <label>
            Texte (Chaque page doit être entre guillemet et séparé par une
            virgule &quot;page1&quot;,&quot;page2&quot;,&quot;page3&quot;,):{' '}
          </label>
          <input type='text' {...register('text', { required: true })} />
          {errors.text && <span>Ce champ est requis</span>}
        </div>
        {/* <GptText /> */}
        <button type='submit' className='create__book__button'>
          Créez le livre
        </button>

        {/*  {response && response.status === 200 && <p>Livre créé avec succès</p>} */}
      </form>
    </div>
  );
}
