import '../sass/Home.scss';
import image1 from '../assets/images/1.webp';
import image2 from '../assets/images/2.webp';
import image3 from '../assets/images/3.webp';

import SectionChoice from '../components/SectionChoice';

function Home() {
    return (
        <div className="Home-section">
            <section className="Books-section">
                <SectionChoice src={image1} title="Writer" path="/MyBooks" />
                <SectionChoice src={image3} title="All Books" path="/Biblio" />
            </section>
        </div>
    );
}

export default Home;

