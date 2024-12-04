import React from 'react'
import '../sass/CardsBooks.scss'
import Data from '../Data.json' // Assurez-vous que le chemin du fichier JSON est correct.
import { Link } from 'react-router-dom'

function CardsBooks() {
    return (
        <section className="CardsBooks-section">
            <div className="CardsBooks-container">
                {Data.map((book) => (
                    <Link to={`/book/${book.id}`} key={book.id} className="Link-book">
                        <article className="Card-book">
                            <img src={book.cover} alt={book.title} />
                        </article>
                        <div className="settings">
                            <p>0%</p>
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CardsBooks
