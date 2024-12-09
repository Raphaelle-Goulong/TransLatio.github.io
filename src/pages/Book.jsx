import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mammoth from 'mammoth';
import '../sass/Book.scss';
import data from '../Data.json';

function Book() {
    const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
    const book = data.find((item) => item.id === id); // Trouve le livre correspondant
    const [chapters, setChapters] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (book) {
            fetchBookContent(book.url);
        }
    }, [book]);

    const fetchBookContent = (url) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier Word.');
                }
                return response.arrayBuffer(); // Lit le fichier en tant que buffer
            })
            .then((arrayBuffer) =>
                mammoth.extractRawText({ arrayBuffer }).then((result) => {
                    const jsonChapters = convertToJsonStructure(result.value);
                    setChapters(jsonChapters); // Mets à jour les chapitres
                })
            )
            .catch((err) => setError(err.message));
    };

    const convertToJsonStructure = (content) => {
        const paragraphs = content.split('\n');
        const chapters = [];
        let currentChapter = { title: '', content: '' };

        paragraphs.forEach((paragraph) => {
            const trimmed = paragraph.trim();

            // Identifier les débuts de chapitres (par ex. "Chapter 1")
            if (/^(Chapter|Chapitre)?\s*\d+/i.test(trimmed)) {
                if (currentChapter.title || currentChapter.content) {
                    chapters.push({ ...currentChapter });
                }
                currentChapter = {
                    title: trimmed,
                    content: '',
                };
            } else if (trimmed) {
                currentChapter.content += trimmed + '\n';
            }
        });

        if (currentChapter.title || currentChapter.content) {
            chapters.push(currentChapter);
        }

        return chapters;
    };

    return (
        <div className="Book-section">
            {book ? (
                <>
                    <h1 className="Book-title">{book.title}</h1>
                    {chapters.length > 0 ? (
                        chapters.map((chapter, index) => (
                            <div key={index} className="chapter">
                                <h2 className="chapter-title">{chapter.title}</h2>
                                <p className="chapter-content">{chapter.content}</p>
                            </div>
                        ))
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <p>Chargement en cours...</p>
                    )}
                </>
            ) : (
                <p>Livre non trouvé. Vérifiez l'ID ou retournez à la bibliothèque.</p>
            )}
        </div>
    );
}

export default Book;
