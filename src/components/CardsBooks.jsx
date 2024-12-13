import '../sass/CardsBooks.scss';
import { Link } from 'react-router-dom';

function CardsBooks({ books }) {  
    return (
        <section className="CardsBooks-section">
            <div className="CardsBooks-container">
                {books.map((book) => (  // Utiliser les livres passés en prop
                    <Link to={`/book/${book.id}`} key={book.id} className="Link-book">
                        <article className="Card-book">
                            <img src={book.cover} alt={book.title} />
                        </article>
                        <div className="settings">
                            <p>{book.title}</p>  
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CardsBooks;


