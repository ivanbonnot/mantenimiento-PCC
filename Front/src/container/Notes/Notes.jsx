import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "./Notes.css";

const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/notes")
      .then((res) => {
        console.log(res)
        const note = res.data.filter((item) => item.estacion === id);
        setNoteData(note);
        console.log(note)
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddNote = () => {
    console.log('ejecutada handleaddnote')
    const newNote = {
      idnota: uuid(),
      title,
      note,
      fecha: moment().format("MMMM Do YYYY, h:mm:ss a"),
      creador: "",
      estacion: id,
    };

    console.log(newNote)

    axios
      .post("http://localhost:8080/notes", newNote)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err));


    // const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // existingNotes.push(newNote);

    // localStorage.setItem("notes", JSON.stringify(existingNotes));

    setTitle("");
    setNote("");
  };

  const handelDeleteNote = (idDelete) => {
    axios
      .delete(`/notes/${id}/${idDelete}`)
      .then((res) => {
        console.log(`Borrada ${idDelete}, ${res}`);
      })
      .catch((err) => console.log(err));

    //Implementar ruta delete
  };

  return (
    <div className="app__bg app__notes-container">
      {noteData ? (
        <div className="app__notes-wrapper">
          <div className="app__notes-read">
            <h1 className="p__cormorant">Notas ET {id}</h1>
            {noteData.map(({ idnota, title, nota, fecha, creador }) => (
              <div className="app__notes-note" key={idnota}>
                <p className="title p__opensans">Título: {title}</p>
                <p className="note p__opensans">Aclaración: {nota}</p>
                <p className="author p__opensans">Fecha: {fecha}</p>
                <p className="date p__opensans">Autor: {creador}</p>
                <button
                  type="button"
                  className="delete__button"
                  onClick={() => handelDeleteNote(idnota)}
                >
                  Eliminar Nota
                </button>
              </div>
            ))}
          </div>

          <div className="app__notes-write">
            <h2 className="p__cormorant">Agregar una nota</h2>
            <input
              type="text"
              placeholder="Titulo"
              className="app__notes-write_title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="textarea"
              rows={7}
              placeholder="Aclaración"
              className="app__notes-write_note"
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="button"
              className="custom__button"
              onClick={() => handleAddNote()}
            >
              Agregar nota
            </button>
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
