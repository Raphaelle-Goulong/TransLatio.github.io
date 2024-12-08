import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../sass/Book.scss';
import data from '../Data.json';

function Book() {
    const { id } = useParams(); // Récupère l'ID depuis l'URL, c'est une chaîne
    const book = data.find(item => item.id === id); // Compare directement avec l'ID du JSON

    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        if (book) {
            // Charger les chapitres depuis le fichier JSON spécifié dans le champ 'url'
            fetch(book.url)
                .then(response => response.json())
                .then(data => setChapters(data.chapters))
                .catch(error => console.error('Erreur lors du chargement des chapitres :', error));
        }
    }, [book]);

    return (
        <div className="Book-section">
            {book ? (
                <>
                    <h1 className="Book-title">{book.title}</h1>
                    {chapters.map((chapter, index) => (
                        <div key={index}>
                            <h2 className="chapter-title">{chapter.title}</h2>
                            <p className="chapter-content">{chapter.content}</p>
                        </div>
                    ))}
                </>
            ) : (
                <p>Livre non trouvé. Vérifiez l'ID ou retournez à la bibliothèque.</p>
            )}
        </div>
    );
}

export default Book;
