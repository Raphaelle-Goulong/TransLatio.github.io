import '../sass/Header.scss'
import { useState } from 'react'

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
        <>
            <div className="Header-section">
                <nav className="Navbar">
                    <h1>Latio</h1>
                    <div className="container_button_hamburger">
                        <div
                            id="button_hamburger"
                            className={menuOpen ? 'open' : ''}
                            onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className={`Overlay ${menuOpen ? 'open' : ''}`}>
                            <ul>
                                <li className="Menu">
                                    <a href="#Menu">
                                        <i className="fa-solid fa-bars"></i>
                                        <h3 onClick={closeMenu}>Menu</h3>
                                    </a>
                                </li>
                                <li className="Setting">
                                    <a href="#">
                                        <i className="fa-solid fa-gear"></i>
                                        <h3>Parametres</h3>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header
