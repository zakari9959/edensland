import OpenAI from 'openai';

/* interface Props {
  title: string;
  age: string;
  demande: string;
  generatedText: string | null;
  setGeneratedText: (text: string) => void;
} */

export default async function GptText({}) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  });
  const prompt = `Avec le titre, l'âge requis et la demande de l'utilisateur, tu vas devoir inventer une histoire inédite, originale et passionnante. Pour cela tu vas devoir me retourner précisement un tableau JSON où chaque ligne équivaut à une ligne`;

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  setGeneratedText(chatCompletion.choices[0].message.toString());
  console.log(chatCompletion.choices[0].message);

  return generatedText;
}
