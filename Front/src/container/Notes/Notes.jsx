import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Importa los estilos
import "./Notes.css";
import Spinner from '../../components/Spinner/Spinner';

const apiUrl = process.env.REACT_APP_API_URL;

const Notes = () => {
  const { id } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [noteResolvedData, setNoteResolvedData] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  const loadNotes = useCallback(() => {
    axios
      .get(`${apiUrl}/notes`, {
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
      .get(`${apiUrl}/notesresolved`, {
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

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Limpieza del event listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('resize', handleResize);
    };

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

    axios
      .post(`${apiUrl}/notes`, newNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
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
              const getNoteById = await axios.get(`${apiUrl}/notes/${idDelete}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })

              await axios.post(`${apiUrl}/notesresolved/`, getNoteById.data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })

              await axios.delete(`${apiUrl}/notes/${idDelete}`, {
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


  const formatDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
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
              <p className="author p__opensans">Fecha: {formatDate(fecha)}</p>
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
            className="custom__button"
            disabled={title.length < 4 && note.length < 4}
            onClick={() => handleAddNote()}
          >
            Agregar nota
          </button>
        </div>


        <div className="app__notes-delete">
          {noteResolvedData && !loading ? (
            <h1 className="p__cormorant">Notas Eliminadas {id}</h1>
          ) : (
            <div className='spinner'>
              <Spinner />
            </div>
          )}
          {windowWidth > 768 ? (
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
                    <td className="p__opensans">{formatDate(fecha)}</td>
                    <td className="p__opensans">{creador}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="app__notes-delete-768">
              {noteResolvedData.map(({ idnota, title, fecha, creador }) => (
                <div className="app__notes-delete-note" key={idnota}>
                  <p className="title p__opensans">Título: {title}</p>
                  <p className="author p__opensans">Fecha: {formatDate(fecha)}</p>
                  <p className="date p__opensans">Autor: {creador}</p>
                  <div>
                  </div>
                </div>
              ))
              }
            </div>
          )
          }

        </div>
      </div>
    </div>
  )
};


export default Notes;
