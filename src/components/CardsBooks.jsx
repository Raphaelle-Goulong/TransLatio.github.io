import '../sass/CardsBooks.scss'
import Img from '../assets/images/michael-baccin-XopauR-Nagk-unsplash.jpg'

function CardsBooks() {
    return (
        <>
            <section className="CardsBooks-section">
                <div className="CardsBooks">
                    <a href="/Book">
                        <img src={Img} alt="" />
                    </a>
                </div>
                <div className="settings">
                    <p>0%</p>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </section>
        </>
    )
}

export default CardsBooks
