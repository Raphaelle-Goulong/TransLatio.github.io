import React from 'react';
import '../sass/Dropdowns.scss';

function Dropdowns({ chapters, onSelectChapter, currentChapterIndex }) {
    return (
        <div className="dropdown">
            <select
                value={currentChapterIndex} // Définit le chapitre sélectionné
                onChange={(e) => onSelectChapter(Number(e.target.value))}
                className="dropdown-select"
            >
                {chapters.map((chapter, index) => (
                    <option key={index} value={index}>
                        {chapter.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdowns;
