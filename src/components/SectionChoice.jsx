import { useNavigate } from 'react-router-dom';
import '../sass/SectionChoice.scss';

function SectionChoice({ src, title, path }) {
    const navigate = useNavigate(); // Hook pour la navigation

    return (
        <div className="SectionChoice-section" onClick={() => navigate(path)} >
            <section className="Buttons-section">
                <h2 className='Title-section'>{title}</h2>
                <img src={src} alt="img" className='img' />
            </section>
        </div>
    );
}

export default SectionChoice;
