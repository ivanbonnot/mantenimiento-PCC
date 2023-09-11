import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Notes.css'

const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    axios
      .get("../notes.json")
      .then(res => {
        const note = res.data.filter(item => item.estacion === id);
        setNoteData(note);
      })
      .catch(err => console.log(err))
  }, [id]);


  return (
    <div className="app__bg app__notes-container">
      {console.log(noteData)}
      {noteData ? (
        <div className="app__notes-wrapper">

          <div className="app__notes-read">
            <h1 className="p__cormorant">Notas ET {id}</h1>
            {noteData.map(({ idnota, title, nota, fecha, creador }) =>
              <div className="app__notes-note" key={idnota}>
                <p className="title p__opensans">Título:  {title}</p>
                <p className="note p__opensans">Aclaración:  {nota}</p>
                <p className="author p__opensans">Fecha:  {fecha}</p>
                <p className="date p__opensans">Autor:  {creador}</p>
              </div>
            )}
          </div>

          <div className="app__notes-write">

            <input type="text" placeholder="Titulo" className="app__notes-write_title" />
            <textarea type="textarea" rows={5}  placeholder="Aclaración" className="app__notes-write_note" />
            <button type="button" className="custom__button">Agregar nota</button>

          </div>
          
        </div>
      ) : (
        <div>
          <h2>Note not found</h2>
        </div>
      )}
    </div>
  );
};

export default Notes;
