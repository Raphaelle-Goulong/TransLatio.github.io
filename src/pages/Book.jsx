import '../sass/Book.scss'
import Img2 from '../assets/images/1.jpg'




function Book() {
    return (
        <>
            <div className="Book-section">
                <section className="Book-contenue">
                    <button>Translate</button>
                    <img src={Img2} alt="" />
                </section>
                
            </div>
        </>
    )
}

export default Book
