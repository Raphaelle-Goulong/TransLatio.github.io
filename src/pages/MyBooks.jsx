import '../sass/MyBooks.scss'
import CardsBooks from '../components/CardsBooks'
import DataMyBooks from '../DataMyBooks.json'
import { useState } from 'react'

function MyBooks() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    // Trier les livres par date pour la section des ajouts récents
    const recentBooks = [...DataMyBooks]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)

    // Filtrer les livres pour la recherche
    const filteredBooks = DataMyBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Trier les livres par ordre alphabétique pour la bibliothèque
    const sortedBooks = [...DataMyBooks].sort((a, b) =>
        a.title.localeCompare(b.title)
    )

    // Fonction pour activer la recherche
    const handleSearchClick = () => {
        setIsSearching(true)
    }

    // Fonction pour réinitialiser la recherche
    const handleResetClick = () => {
        setIsSearching(false)
        setSearchTerm('')
    }

    return (
        <>
            <div className="Home-section">
                <section className="Books-section">
                    <div className="Books-container">
                        {/* Section de recherche */}
                        <div className="search-content">
                            <div className="search-bar">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        handleSearchClick()
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Rechercher un livre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSearchClick}
                                        className="validation"
                                        type="submit"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                    <button onClick={handleResetClick} className="cross">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </form>
                            </div>
                        </div>


                        {/* Section "Tous les livres" */}
                        <div className="Books-all">
                            <div className="title-section">
                                <h2>Bibliothèque</h2>
                            </div>
                            {isSearching ? (
                                filteredBooks.length > 0 ? (
                                    <CardsBooks books={filteredBooks} />
                                ) : (
                                    <p>Aucun livre trouvé</p>
                                )
                            ) : (
                                <CardsBooks books={sortedBooks} />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default MyBooks