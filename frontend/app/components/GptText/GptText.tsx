import React, { useState } from 'react';

export default function GptText() {
  const [generatedText, setGeneratedText] = useState('');
  const [inputText, setInputText] = useState('');

  const handleGenerateText = async () => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const url = 'https://api.openai.com/v1/engines/davinci/completions';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 50,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const result = data.choices[0].text;
        setGeneratedText(result);
      } else {
        console.error("Erreur lors de la requête à l'API GPT-3");
      }
    } catch (error) {
      console.error("Erreur lors de la requête à l'API GPT-3", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder='Quelle histoires souhaitez-vous?'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button onClick={handleGenerateText}>Générer du texte</button>
      {generatedText && (
        <div>
          <h2>Résultat :</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </div>
  );
}
