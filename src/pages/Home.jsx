import '../sass/Home.scss'
import CardsBooks from '../components/CardsBooks'
import Data from '../Data.json'





function Home() {
    return (
        <>
            <div className="Home-section">
                <section className="Books-section">
                    
                    <div className="Books-container">
                        <h2> Bibliothèque</h2>
                        <div className="Books-all">
                     
                            <CardsBooks   />
                       
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home
