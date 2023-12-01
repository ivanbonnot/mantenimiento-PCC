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
      fecha: moment().add(3, 'hours').format("MMMM Do YYYY, h:mm:ss a"),
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

  const handleShareNote = async (title, note) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Compartir Nota',
          text: `Lugar: ${id.toUpperCase()} \nTítulo: ${title}\nAclaración: ${note}`,
        });
      } else {
        throw new Error('La API de Web Share no está soportada en este navegador.');
      }
    } catch (error) {
      console.error('Error al intentar compartir:', error.message);
    }
  }

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
                {windowWidth < 768 && (
                  <button
                    type="button"
                    className="share__button"
                    onClick={() => handleShareNote(title, note)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" style={{ marginLeft: '10px', display: 'inline-block' }} width="25" height="25" viewBox="0 0 48 48">
                      <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                )}

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
            disabled={!(title.length >= 4 && note.length >= 4)}
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
