import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa los estilos
import "./Notes.css";

const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");



  const loadNotes = useCallback(() => {

    //const token = localStorage.getItem('token', token);
    //console.log(`token Get notes: ${token}`)
    axios
      .get("http://localhost:8080/notes", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        const note = res.data.notes.filter((item) => item.estacion === id);
        setNoteData(note);
      })
      .catch((err) => console.log(err));
  }, [id]); // Incluye 'id' como dependencia en useCallback

  useEffect(() => {
    loadNotes()
  }, [id, loadNotes]);


  const handleAddNote = () => {
    const newNote = {
      idnota: uuid(),
      title,
      note,
      fecha: moment().format("MMMM Do YYYY, h:mm:ss a"),
      creador: "",
      estacion: id,
    };

    console.log(newNote)


    axios.post("http://localhost:8080/notes", newNote, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res)
        loadNotes()
      })
      .catch((err) => console.log(err));


    // const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // existingNotes.push(newNote);

    // localStorage.setItem("notes", JSON.stringify(existingNotes));

    setTitle("");
    setNote("");
  };

  const handleDeleteNote = (idDelete) => {

    // Mostrar un cuadro de diálogo de confirmación
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            axios
              .delete(`http://localhost:8080/notes/${idDelete}`)
              .then((res) => {
                console.log(idDelete)
                console.log(`Borrada ${idDelete}, ${res}`);
                loadNotes()
              })
              .catch((err) => {
                console.log(idDelete)
                console.log(err)
              })
          },
        },
        {
          label: 'No',
          onClick: () => {
          },
        },
      ]
    });
  }

  return (
    <div className="app__bg app__notes-container">
      {noteData ? (
        <div className="app__notes-wrapper">
          <div className="app__notes-read">
            <h1 className="p__cormorant">Notas ET {id}</h1>
            {noteData.map(({ _id, idnota, title, note, fecha, creador }) => (
              <div className="app__notes-note" key={idnota}>
                <p className="title p__opensans">Título: {title}</p>
                <p className="note p__opensans">Aclaración: {note}</p>
                <p className="author p__opensans">Fecha: {fecha}</p>
                <p className="date p__opensans">Autor: {creador}</p>
                <div><button
                  type="button"
                  className="delete__button"
                  onClick={() => handleDeleteNote(_id)}
                >
                  Eliminar Nota
                </button></div>

              </div>
            ))}
          </div>

          <div className="app__notes-write">
            <h2 className="p__cormorant">Agregar una nota</h2>
            <input
              type="text"
              placeholder="Titulo"
              className="app__notes-write_title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              type="textarea"
              rows={7}
              placeholder="Aclaración"
              className="app__notes-write_note"
              value={note}
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
