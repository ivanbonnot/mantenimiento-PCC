import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Importa los estilos
import "./Notes.css";
import Spinner from '../../components/Spinner/Spinner';

const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [noteResolvedData, setNoteResolvedData] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);


  const loadNotes = useCallback(() => {
    axios
      .get("http://localhost:8080/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const note = res.data.notes.filter((item) => item.estacion === id);
        setNoteData(note);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [id]);


  const loadResolvedNotes = useCallback(() => {
    axios
      .get("http://localhost:8080/notesresolved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const noteResolved = res.data.notesResolved.filter((item) => item.estacion === id);
        setNoteResolvedData(noteResolved);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [id]);


  useEffect(() => {
    loadNotes();
    loadResolvedNotes();
  }, [id, loadNotes, loadResolvedNotes]);


  const handleAddNote = () => {
    const newNote = {
      idnota: uuid(),
      title,
      note,
      fecha: moment().format("MMMM Do YYYY, h:mm:ss a"),
      creador: localStorage.getItem("user"),
      estacion: id,
    };

    console.log(newNote);

    axios
      .post("http://localhost:8080/notes", newNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);

        setTitle("");
        setNote("");
        loadNotes();
      })
      .catch((err) => console.log(err));

    // const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // existingNotes.push(newNote);

    // localStorage.setItem("notes", JSON.stringify(existingNotes));
  };


  const handleDeleteNote = (idDelete) => {
    confirmAlert({
      title: "Confirmar ",
      message: "¿Estás seguro de que deseas eliminar esta nota?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              const getNoteById = await axios.get(`http://localhost:8080/notes/${idDelete}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })

              await axios.post(`http://localhost:8080/notesresolved/`, getNoteById.data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })

              await axios.delete(`http://localhost:8080/notes/${idDelete}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              loadNotes();
              loadResolvedNotes();

            } catch (err) {
              console.log(idDelete);
              console.log(err);
            }
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };


  return (
    <div className="app__bg app__notes-container">
      <div className="app__notes-wrapper">
        <div className="app__notes-read">
          {noteData && !loading ? (
            <h1 className="p__cormorant">Notas {id}</h1>
          ) : (
            <div className='spinner'>
              <Spinner />
            </div>
          )}
          {noteData.map(({ _id, idnota, title, note, fecha, creador }) => (
            <div className="app__notes-note" key={idnota}>
              <p className="title p__opensans">Título: {title}</p>
              <p className="note p__opensans">Aclaración: {note}</p>
              <p className="author p__opensans">Fecha: {fecha}</p>
              <p className="date p__opensans">Autor: {creador}</p>
              <div>
                <button
                  type="button"
                  className="delete__button"
                  onClick={() => handleDeleteNote(_id)}
                >
                  Eliminar Nota
                </button>
              </div>
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


        <div className="app__notes-delete">
          {noteResolvedData && !loading ? (
            <h1 className="p__cormorant">Notas Eliminadas ET {id}</h1>
          ) : (
            <div className='spinner'>
              <Spinner />
            </div>
          )}
          <table className="app__notes-delete_table">
            <thead>
              <tr>
                <th className="p__opensans">Nota</th>
                <th className="title p__opensans">Título</th>
                <th className="author p__opensans">Fecha</th>
                <th className="date p__opensans">Autor</th>
              </tr>
            </thead>
            <tbody>
              {noteResolvedData.map(({ idnota, title, fecha, creador }, index) => (
                <tr key={idnota}>
                  <td className="p__opensans">{index + 1}</td>
                  <td className="p__opensans">{title}</td>
                  <td className="p__opensans">{fecha}</td>
                  <td className="p__opensans">{creador}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
};


export default Notes;
