import React, { useState } from 'react';
import mammoth from 'mammoth';

function WordToJsonConverter() {
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertWordToJson(file);
    }
  };

  const convertWordToJson = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = reader.result;
      mammoth.extractRawText({ arrayBuffer: arrayBuffer })
        .then((result) => {
          const content = result.value;
          const json = convertToJsonStructure(content);
          setJsonOutput(json);
        })
        .catch((err) => console.error("Error extracting text from Word file:", err));
    };
    reader.readAsArrayBuffer(file);
  };

  const convertToJsonStructure = (content) => {
    const paragraphs = content.split('\n'); // Divise le contenu en paragraphes
    const chapters = [];
    let currentChapter = { title: "", content: [] };

    paragraphs.forEach((paragraph) => {
      const trimmed = paragraph.trim();

      // Si le paragraphe est un titre de chapitre
      if (/^(Chapter|Chapitre)?\s*\d+/i.test(trimmed)) {
        // Si un chapitre était déjà en cours, on le pousse dans le tableau
        if (currentChapter.title || currentChapter.content.length) {
          chapters.push({ ...currentChapter });
        }
        // Démarre un nouveau chapitre
        currentChapter = {
          title: trimmed,
          content: [],
        };
      } else if (trimmed) {
        // Ajoute le paragraphe au contenu du chapitre
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          currentChapter.content.push(`\n\"${trimmed.slice(1, -1)}\"\n`);
        } else {
          currentChapter.content.push(`\n${trimmed}\n`);
        }
      }
    });

    // Ajoute le dernier chapitre après la boucle
    if (currentChapter.title || currentChapter.content.length) {
      chapters.push(currentChapter);
    }

    return chapters;
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
    </div>
  );
}

export default WordToJsonConverter;
