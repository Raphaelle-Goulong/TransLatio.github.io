import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Data from '../Data.json'; // Charger les données JSON
import mammoth from 'mammoth'; // Importer mammoth pour convertir Word en HTML
import '../sass/Book.scss';

function Book() {
    const { id } = useParams();  // Récupérer l'ID depuis l'URL
    const book = Data.find(item => item.id === id); // Trouver le livre dans le JSON
    const [htmlContent, setHtmlContent] = useState('');  // State pour stocker le contenu HTML du Word

    useEffect(() => {
        if (book) {
            fetchTextFromPdf(book.url); // Appeler la fonction pour charger et convertir le Word
        }
    }, [book]);

    // Fonction pour charger et convertir le fichier Word
    const fetchTextFromPdf = (pdfUrl) => {
        fetch(pdfUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
                mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                    .then(function (result) {
                        setHtmlContent(result.value);  // Stocker le contenu HTML dans le state
                    })
                    .catch(function (err) {
                        console.error("Error converting Word to HTML", err);
                    });
            })
            .catch(error => {
                console.error("Error loading the Word file:", error);
            });
    };

    return (
        <div className="Book-section">
            {book ? (
                <>
                    <h1 className="Book-title">{book.title}</h1>
                    <div className="book-content">
                        {/* Afficher le contenu HTML du Word */}
                        {htmlContent ? (
                            <div className="book-text" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        ) : (
                            <p>Chargement du fichier...</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Livre non trouvé. Vérifiez l'ID ou retournez à la bibliothèque.</p>
            )}
        </div>
    );
}

export default Book;
