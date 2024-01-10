'use client';
import React, { useState } from 'react';
import OpenAI from 'openai';
import './CreateBook.css';
import { useUserIdContext } from '@/app/context/userIdContext';
import Image from 'next/image';

type Props = {};

export default function CreateBook({}: Props) {
  const [generatedText, setGeneratedText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [imageUrl, setImageUrl] = useState<null | File>(null);
  const { userId, setUserId } = useUserIdContext();
  const [validationMessage, setvalidationMessage] = useState<string | null>(
    null
  );
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });
    const prompt = `${userInput} Avec la demande de l'utilisateur, tu vas devoir inventer une histoire pour enfant inédite d'environ 10 pages à partir de ce json, chaque ligne dans text[] correspond à une page et ne doit pas dépasser 40 mots. Il faudra aussi que tu trouves un titre correspondant à l'histoire et que tu indiques l'age reccommandé. L'histoire devra être passionnante et originale, pour cela tu peux t'inspirer des livres pour enfants modernes et populaires. Fais attention au contenu de l'histoire, elles sont à destination d'enfant et il faut donc que le texte soit adapté à leur âge. Pour cela tu vas devoir me retourner précisément un tableau JSON correspondant à ça donc fais en sorte qu'avec la limite de token que je t'impose tu arrives à terminer l'histoire et le json:
    {"userId": "${userId}",
      "age": "Age reccommandé pour lire l'histoire",
    "title": "Titre de l'histoire",
    "text":
    ["Ullamco nulla cillum aliqua labore quis qui nulla enim velit duis irure dolor do. Id veniam ullamco velit ad occaecat exercitation culpa nostrud aliquip. Ea in sint anim elit elit sunt mollit laboris Lorem culpa officia ex reprehenderit.",
    "Commodo dolor nim irure quis excepteurirure qu.",
    "Commodo dolor enim dolor anim nulla anim isenim dolor anim nulla a excepteur.",
    "Est qui veniam id et id sunt.",
    "Labore laboris incididunt aute aute nulla esse quis dolor excepteur nostrud deserunt reprehenderit.",
    "Labore laboris incididunt aute aute nulla esse quis dolor excepteur nostrud deserunt reprehenderit.",
    "Labore laboris incididunt aute aute nulla esse quis dolor excepteur nostrud deserunt reprehenderit."]
    }`;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
    });

    const generatedText = chatCompletion.choices[0].message.content;
    if (generatedText) {
      console.log(generatedText);
      setGeneratedText(generatedText);
    } else {
      setvalidationMessage('Erreur lors de la requête GPT API');
      setLoading(false);
    }
    const formDataToSubmit = new FormData();
    if (generatedText) {
      formDataToSubmit.append('book', generatedText);
    }

    if (imageUrl) {
      formDataToSubmit.append('imageUrl', imageUrl);
    }
    const apiResponse = await fetch(
      'https://edensland-api.vercel.app/api/books',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSubmit,
      }
    );
    const data = await apiResponse.json();
    if (apiResponse.ok) {
      setvalidationMessage(data.message);
      setLoading(false);
    } else {
      console.error(
        "Une erreur s'est produite lors de la requête vers votre API personnelle"
      );
      const errorMessage = await data.error();
      setvalidationMessage('Error: ' + errorMessage);
      setLoading(false);
    }
  };

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserInput(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(file);
    }
  };

  return (
    <form className='create__book' onSubmit={handleSubmit}>
      <div className='create__book__image__input create__book__image'>
        <label htmlFor='image'>
          Ajoutez une image de couverture pour votre livre, je vous recommande
          de la générer gratuitement avec Dall-E et Copilot
        </label>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id='image'
        />
        <label htmlFor='image' className='create__book__image'>
          {imageUrl ? (
            <Image
              src={URL.createObjectURL(imageUrl)}
              alt='Image Preview'
              width={100}
              height={150}
              className='create__book__image__preview'
            />
          ) : (
            <p className='create__book__image__placeholder'>+</p>
          )}
        </label>
      </div>
      <div className='create__book__right'>
        <textarea
          className='create__book__text'
          value={userInput}
          onChange={handleUserInputChange}
          placeholder='Indiquez ce que vous souhaitez dans votre histoire'
          required={true}
        />
        <button type='submit' disabled={loading}>
          {loading
            ? 'Génération de votre histoire...'
            : 'Générez votre histoire'}
        </button>
        {validationMessage && (
          <div style={{ color: 'red' }}>{validationMessage}</div>
        )}
      </div>
    </form>
  );
}
