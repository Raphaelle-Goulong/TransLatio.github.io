import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import mammoth from 'mammoth'
import '../sass/Book.scss'
import Dropdowns from '../components/Dropdowns'
import data from '../Data.json'

function Book() {
    const { id } = useParams()
    const book = data.find((item) => item.id === id)
    const [chapters, setChapters] = useState([])
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
    const [error, setError] = useState(null)
    const [isTranslated, setIsTranslated] = useState(false)
    const [isLoadingTranslation, setIsLoadingTranslation] = useState(false) // Nouvel état

    useEffect(() => {
        if (book) {
            fetchBookContent(book.url)
        }
    }, [book])

    const fetchBookContent = (url) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier Word.')
                }
                return response.arrayBuffer()
            })
            .then((arrayBuffer) =>
                mammoth.extractRawText({ arrayBuffer }).then((result) => {
                    const jsonChapters = convertToJsonStructure(result.value)
                    setChapters(jsonChapters)
                })
            )
            .catch((err) => setError(err.message))
    }

    const convertToJsonStructure = (content) => {
        const paragraphs = content.split('\n')
        const chapters = []
        let currentChapter = { title: '', content: '' }

        paragraphs.forEach((paragraph) => {
            const trimmed = paragraph.trim()
            // if (/^(Chapter|Chapitre)?\s*\d+/i.test(trimmed)) {
            //     if (currentChapter.title || currentChapter.content) {
            //         chapters.push({ ...currentChapter });
            //     }
            //     currentChapter = {
            //         title: trimmed,
            //         content: '',
            //     };
            // } else if (trimmed) {
            //     currentChapter.content += trimmed + '\n';
            // }

            // Modifier la condition pour détecter les chapitres par autre critère
            if (
                trimmed.toLowerCase().startsWith('chapter') ||
                trimmed.toLowerCase().startsWith('chapitre')
            ) {
                if (currentChapter.title || currentChapter.content) {
                    chapters.push({ ...currentChapter })
                }
                currentChapter = {
                    title: trimmed, // Utiliser le texte brut comme titre
                    content: ''
                }
            } else if (trimmed) {
                currentChapter.content += trimmed + '\n'
            }
        })
        
        // Ajouter le dernier chapitre si nécessaire
        if (currentChapter.title || currentChapter.content) {
            chapters.push(currentChapter)
        }

        return chapters
    }

    const handleTranslate = () => {
        const currentContent = chapters[currentChapterIndex].content

        if (!isTranslated) {
            setIsLoadingTranslation(true) // Activer le chargement
            const paragraphs = currentContent.split('\n').filter((p) => p.trim() !== '')
            const translatedParagraphs = []

            const translateParagraph = (index) => {
                if (index >= paragraphs.length) {
                    const translatedText = translatedParagraphs.join('\n')
                    const updatedChapters = [...chapters]
                    updatedChapters[currentChapterIndex].content = translatedText
                    setChapters(updatedChapters)
                    setIsTranslated(true)
                    setIsLoadingTranslation(false) // Désactiver le chargement
                    return
                }

                const paragraph = paragraphs[index]
                fetch(
                    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=${encodeURIComponent(
                        paragraph
                    )}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const translatedText = data[0].map((sentence) => sentence[0]).join('')
                        translatedParagraphs.push(translatedText)
                        translateParagraph(index + 1)
                    })
                    .catch((err) => {
                        console.error('Erreur de traduction:', err)
                        translatedParagraphs.push(paragraph)
                        translateParagraph(index + 1)
                    })
            }

            translateParagraph(0)
        } else {
            fetchBookContent(book.url)
            setIsTranslated(false)
        }
    }

    const handleSelectChapter = (index) => {
        setCurrentChapterIndex(index)
    }

    return (
        <div className="Book-section">
            {book ? (
                <>
                    <h1 className="Book-title">{book.title}</h1>
                    {chapters.length > 0 ? (
                        <div className="chapter">
                            <h2 className="chapter-title">{chapters[currentChapterIndex].title}</h2>
                            <div className="help-speed">
                                <Dropdowns
                                    chapters={chapters}
                                    onSelectChapter={handleSelectChapter}
                                />
                                <button
                                    className="translate-button"
                                    onClick={handleTranslate}
                                    disabled={isLoadingTranslation} // Désactiver le bouton si la traduction est en cours
                                >
                                    {isTranslated ? 'Texte original' : 'Traduire en français'}
                                </button>
                            </div>
                            {isLoadingTranslation ? ( // Afficher l'animation de chargement
                                <div className="loading-spinner">
                                    <p>Traduction en cours...</p>
                                </div>
                            ) : (
                                <p className="chapter-content">
                                    {chapters[currentChapterIndex].content}
                                </p>
                            )}
                            <div className="chapter-navigation">
                                <button
                                    onClick={() =>
                                        setCurrentChapterIndex((prev) => Math.max(prev - 1, 0))
                                    }
                                    disabled={currentChapterIndex === 0}>
                                    Chapitre précédent
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentChapterIndex((prev) =>
                                            Math.min(prev + 1, chapters.length - 1)
                                        )
                                    }
                                    disabled={currentChapterIndex === chapters.length - 1}>
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
    )
}

export default Book
