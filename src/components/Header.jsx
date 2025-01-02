import '../sass/Header.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    // Fonction qui bascule l'état d'ouverture du menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    // Fonction pour fermer le menu lorsqu'on clique sur un lien
    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <header className="Header-section">
            <nav className="Navbar">
                <Link to="/">
                    <h1>Latio</h1>
                </Link>
                <div className="container_button_hamburger">
                    {/* Bouton hamburger pour ouvrir/fermer le menu */}
                    <div
                        id="button_hamburger"
                        className={menuOpen ? 'open' : ''}
                        onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* Overlay du menu */}
                    <div className={`Overlay ${menuOpen ? 'open' : ''}`}>
                        <ul>
                            <li className="Menu">
                                <Link to="/" onClick={closeMenu}>
                                    <i className="fa-solid fa-bars"></i>
                                    <h3>Menu</h3>
                                </Link>
                            </li>
                            <li className="MyBooks">
                                <Link to="/MyBooks" onClick={closeMenu}>
                                <i className="fa-solid fa-book"></i>
                                    <h3>Mes Livres</h3>
                                </Link>
                            </li>
                            <li className="Setting">
                                <Link to="/settings" onClick={closeMenu}>
                                    <i className="fa-solid fa-gear"></i>
                                    <h3>Paramètres</h3>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
