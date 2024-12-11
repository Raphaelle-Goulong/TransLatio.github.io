import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mammoth from 'mammoth';
import '../sass/Book.scss';
import data from '../Data.json';

function Book() {
    const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
    const book = data.find((item) => item.id === id); // Trouve le livre correspondant
    const [chapters, setChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0); // Index du chapitre affiché
    const [error, setError] = useState(null);
    const [isTranslated, setIsTranslated] = useState(false); // État de la traduction

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

    const handleNextChapter = () => {
        if (currentChapterIndex < chapters.length - 1) {
            setCurrentChapterIndex(currentChapterIndex + 1);
        }
    };

    const handlePreviousChapter = () => {
        if (currentChapterIndex > 0) {
            setCurrentChapterIndex(currentChapterIndex - 1);
        }
    };

    const handleTranslate = () => {
        const currentContent = chapters[currentChapterIndex].content;
    
        if (!isTranslated) {
            // Diviser le texte en morceaux (par exemple, paragraphes)
            const paragraphs = currentContent.split('\n').filter((p) => p.trim() !== '');
            const translatedParagraphs = [];
    
            // Fonction récursive pour traduire chaque paragraphe
            const translateParagraph = (index) => {
                if (index >= paragraphs.length) {
                    // Quand tous les paragraphes sont traduits, mettre à jour le contenu
                    const translatedText = translatedParagraphs.join('\n');
                    const updatedChapters = [...chapters];
                    updatedChapters[currentChapterIndex].content = translatedText;
                    setChapters(updatedChapters);
                    setIsTranslated(true);
                    return;
                }
    
                const paragraph = paragraphs[index];
                fetch(
                    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(
                        paragraph
                    )}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const translatedText = data[0].map((sentence) => sentence[0]).join('');
                        translatedParagraphs.push(translatedText);
                        translateParagraph(index + 1); // Passer au paragraphe suivant
                    })
                    .catch((err) => {
                        console.error('Erreur de traduction:', err);
                        translatedParagraphs.push(paragraph); // En cas d'erreur, conserver le texte original
                        translateParagraph(index + 1);
                    });
            };
    
            // Lancer la traduction du premier paragraphe
            translateParagraph(0);
        } else {
            // Restaurer le texte original
            fetchBookContent(book.url);
            setIsTranslated(false);
        }
    };
    

    return (
        <div className="Book-section">
            {book ? (
                <>
                    <h1 className="Book-title">{book.title}</h1>
                    {chapters.length > 0 ? (
                        <div className="chapter">
                            <h2 className="chapter-title">{chapters[currentChapterIndex].title}</h2>
                            <button className="translate-button" onClick={handleTranslate}>
                                {isTranslated ? 'Texte original' : 'Traduire en français'}
                            </button>
                            <p className="chapter-content">{chapters[currentChapterIndex].content}</p>
                            <div className="chapter-navigation">
                                <button
                                    onClick={handlePreviousChapter}
                                    disabled={currentChapterIndex === 0}
                                >
                                    Chapitre précédent
                                </button>
                                <button
                                    onClick={handleNextChapter}
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
