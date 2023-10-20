import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { et, set } from "../../constants/stations";
//import { AiFillCaretRight } from "react-icons/ai";
import { useNavBarContext } from "../../context/NavBarContext";
import FooterAdm from '../../components/Footer/FooterAdm'
import FooterUser from '../../components/Footer/FooterUser'

import "./Header.css";


const Header = () => {
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteResolvedNoteshasExecutedOnce, setDeleteResolvedNoteshasExecutedOnce] = useState(false);

  const isAdmin = localStorage.getItem('admin')
  const { setShouldRenderNavBar } = useNavBarContext();
  const renderNavBar = () => {
    setShouldRenderNavBar(true)
  }


  const loadNotes = useCallback(() => {
    axios
      .get("http://localhost:8080/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const note = res.data.notes
        setNoteData(note);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, []);

  //Eliminar notas resulestas cada una semana, dejar un maximo de 200 notas
  const deleteNoteResolved = async () => {
    //const idDelete = 1
    let notesAmount
    setDeleteResolvedNoteshasExecutedOnce(false)
    await axios
      .get("http://localhost:8080/notesresolved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        notesAmount = res.data.notesResolved
      })
      .catch((err) => console.log(err))

    if (notesAmount.length >= 2) {

      notesAmount.sort((a, b) => {
        //console.log(a)
        const dateA = (a.fecha)
        const dateB = (b.fecha);
        //console.log(dateA)
        return dateA - dateB;
      });
      for (let i = 0; i < notesAmount.length; i++) {

      }
      // await axios.delete(`http://localhost:8080/notesresolved/${idDelete}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });
    }
  }



  useEffect(() => {
    renderNavBar()
    loadNotes()
    console.log(deleteResolvedNoteshasExecutedOnce)
    if (!deleteResolvedNoteshasExecutedOnce) {
      deleteNoteResolved();
      setDeleteResolvedNoteshasExecutedOnce(true);
      //Una semana = 604800000, por dia 86400000 
      const oneWeekInMillis = 5000;
      setTimeout(() => {
        deleteNoteResolved();
      }, oneWeekInMillis);
    }
  }, [loadNotes])


  return (
    <div>
      <div className="app__header-wrapper app__bg">
        <div className="app__header-et" id="et">
          <div className="app__header-et">

            {et.map(({ title, id }) => (
              <div key={id}>
                <p className="p__header">
                  <img class="" src="./img/electricity.png" alt="" width="30" height="30" style={{ margin: "6px 4px 0 0" }} />
                  <button>
                    <Link to={`notes/${id}`}> {title} (
                      <span style={{ color: noteData.filter((item) => item.estacion === id).length >= 1 ? "red" : "black" }}>
                        {noteData.filter((item) => item.estacion === id).length}
                      </span>
                      ) </Link>
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="app__header-set" id="set">
          <div className="app__header-set set">
            {set.map(({ title, id }) => (
              <div key={id}>

                <p className="p__header">
                  <img class="" src="./img/electricity.png" alt="" width="30" height="30" style={{ margin: "6px 4px 0 0" }} />
                  <button>
                    <Link to={`notes/${id}`}> {title} (
                      <span style={{ color: noteData.filter((item) => item.estacion === id).length >= 1 ? "red" : "black" }}>
                        {noteData.filter((item) => item.estacion === id).length}
                      </span>
                      ) </Link>
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      {isAdmin ? < FooterAdm /> : < FooterUser />}
    </div>
  )
};

export default Header;
