import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mammoth from 'mammoth';
import '../sass/Book.scss';
import Dropdowns from '../components/Dropdowns'; // Assurez-vous que le chemin est correct
import data from '../Data.json';

function Book() {
    const { id } = useParams();
    const book = data.find((item) => item.id === id);
    const [chapters, setChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [error, setError] = useState(null);
    const [isTranslated, setIsTranslated] = useState(false);

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
                return response.arrayBuffer();
            })
            .then((arrayBuffer) =>
                mammoth.extractRawText({ arrayBuffer }).then((result) => {
                    const jsonChapters = convertToJsonStructure(result.value);
                    setChapters(jsonChapters);
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

    const handleTranslate = () => {
        // Traduction - même code que précédemment
    };

    const handleSelectChapter = (index) => {
        setCurrentChapterIndex(index);
    };

    return (
        <div className="Book-section">
            {book ? (
                <>
                    <h1 className="Book-title">{book.title}</h1>
                    {chapters.length > 0 ? (
                        <div className="chapter">
                            
                            <h2 className="chapter-title">{chapters[currentChapterIndex].title}</h2>
                           <div  className="help-speed">
                            <Dropdowns
                                chapters={chapters}
                                onSelectChapter={handleSelectChapter}
                            />
                            <button className="translate-button" onClick={handleTranslate}>
                                {isTranslated ? 'Texte original' : 'Traduire en français'}
                            </button>
                            </div>
                            <p className="chapter-content">{chapters[currentChapterIndex].content}</p>
                            <div className="chapter-navigation">
                                <button
                                    onClick={() =>
                                        setCurrentChapterIndex((prev) =>
                                            Math.max(prev - 1, 0)
                                        )
                                    }
                                    disabled={currentChapterIndex === 0}
                                >
                                    Chapitre précédent
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentChapterIndex((prev) =>
                                            Math.min(prev + 1, chapters.length - 1)
                                        )
                                    }
                                    disabled={currentChapterIndex === chapters.length - 1}
                                >
                                    Chapitre suivant
                                </button>
                            </div>
                        </div>
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
