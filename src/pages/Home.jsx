import '../sass/Home.scss'
import CardsBooks from '../components/CardsBooks'
import Data from '../Data.json'
import { useState } from 'react'

function Home() {
    // Définir un state pour stocker la recherche
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false) // Etat pour savoir si on est en mode recherche

    // Filtrer les livres en fonction du nom
    const filteredBooks = Data.filter(
        (book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrer par titre
    )

    // Fonction pour activer la recherche
    const handleSearchClick = () => {
        setIsSearching(true) // Activer la recherche
    }

    // Fonction pour réinitialiser la recherche
    const handleResetClick = () => {
        setIsSearching(false) // Désactiver la recherche
        setSearchTerm('') // Réinitialiser la recherche
    }

    return (
        <>
            <div className="Home-section">
                <section className="Books-section">
                    <div className="Books-container">
                        <div className="title-section">
                            <h2> Bibliothèque</h2>
                        </div>
                        <div className="search-content">
                            {/* Champ de recherche */}
                            <div className="search-bar">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault() // Empêche le rechargement de la page
                                        handleSearchClick() // Déclenche la recherche
                                    }}>
                                    <input
                                        type="text"
                                        placeholder="Rechercher un livre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSearchClick}
                                        className="validation"
                                        type="submit">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                    <button onClick={handleResetClick} className="cross">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="Books-all">
                            {/* Afficher tous les livres ou uniquement ceux filtrés */}
                            {isSearching ? (
                                filteredBooks.length > 0 ? (
                                    <CardsBooks books={filteredBooks} />
                                ) : (
                                    <p>Aucun livre trouvé</p>
                                )
                            ) : (
                                <CardsBooks books={Data} />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home
