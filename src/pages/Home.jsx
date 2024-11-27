import '../sass/Home.scss'
import CardsBooks from '../components/CardsBooks'

function Home() {
    return (
        <>
            <div className="Home-section">
                <section className="Books-section">
                    <h2> Récents</h2>
                    <div className="Books-recents">
                        <CardsBooks />
                        <CardsBooks />
                    </div>
                    <div className='Books-container'>
                    <h2> Bibliothèque</h2>
                    <div className="Books-all">
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                        <CardsBooks />
                    </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home
