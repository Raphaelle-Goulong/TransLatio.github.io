import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OCRApp = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleOCR = () => {
    setLoading(true);
    Tesseract.recognize(
      image,
      'eng', // Langue à utiliser, 'eng' pour l'anglais. Tu peux aussi installer d'autres langues.
      {
        logger: (m) => console.log(m), // Suivi de la progression
      }
    ).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div>
      <h1>OCR avec Tesseract.js</h1>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button onClick={handleOCR} disabled={!image || loading}>
        {loading ? 'Analyse en cours...' : 'Extraire le texte'}
      </button>
      <div>
        <h3>Texte extrait :</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default OCRApp;
