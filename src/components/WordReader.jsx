import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';

const WordReader = ({ fileUrl, onChaptersLoaded }) => {
    const [chapters, setChapters] = useState([]);
    const [error, setError] = useState(null);

    // Fonction pour charger le contenu du fichier Word
    const fetchBookContent = (url) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier Word.');
                }
                return response.arrayBuffer();
            })
            .then((arrayBuffer) =>
                mammoth.convertToHtml({ arrayBuffer }).then((result) => {
                    const jsonChapters = convertToJsonStructure(result.value);
                    setChapters(jsonChapters);
                    onChaptersLoaded(jsonChapters); // Communiquer les chapitres au parent
                })
            )
            .catch((err) => setError(err.message));
    };

    // Fonction pour transformer le contenu HTML en une structure JSON
    const convertToJsonStructure = (content) => {
        const paragraphs = content.split(/<\/p>/); // Séparation des paragraphes
        const chapters = [];
        let currentChapter = { title: '', content: '' };
    
        paragraphs.forEach((paragraph) => {
            const trimmed = paragraph.replace(/<[^>]+>/g, '').trim(); // Nettoyer le HTML
    
            // Détecter les titres de chapitre (commençant par "Chapter" ou "Chapitre")
            const chapterRegex = /^(chapter\s*:\s*\d+(\.\s*[\w\s]+)?)/i;
    
            if (chapterRegex.test(trimmed)) {
                if (currentChapter.title || currentChapter.content) {
                    chapters.push({ ...currentChapter });
                }
                currentChapter = { title: trimmed.match(chapterRegex)[1], content: '' };
            } else if (trimmed) {
                currentChapter.content += `${paragraph}</p>\n`;
            }
        });
    
        if (currentChapter.title || currentChapter.content) {
            chapters.push(currentChapter);
        }
    
        return chapters;
    };
    

    useEffect(() => {
        if (fileUrl) {
            fetchBookContent(fileUrl);
        }
    }, [fileUrl]);

    // Affichage d'erreurs éventuelles
    if (error) {
        return <p className="error">Erreur : {error}</p>;
    }

    return <p>Chargement en cours...</p>;
};

export default WordReader;
