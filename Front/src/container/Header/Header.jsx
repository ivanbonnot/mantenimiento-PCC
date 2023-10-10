import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { et, set } from "../../constants/stations";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavBarContext } from "../../context/NavBarContext";
import FooterAdm from '../../components/FooterAdm/FooterAdm'

import "./Header.css";


const Header = () => {
  const isAdmin = localStorage.getItem('admin')
  const { setShouldRenderNavBar } = useNavBarContext();
  const renderNavBar = () => {
    setShouldRenderNavBar(true)
  }


  //Eliminar notas resulestas cada una semana, dejar un maximo de 200 notas
  const deleteNoteResolved = () => {
    //const idDelete = 1
    let notesAmount = 0

    setTimeout(async () => {
      await axios
        .get("http://localhost:8080/notesresolved", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          notesAmount = res.data.notesResolved

        })
      if (notesAmount.length >= 2) {
        notesAmount.sort((a, b) => {
          console.log(a)
          const dateA = (a.fecha)
          const dateB = (b.fecha);
          console.log(dateA)
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
    }, 5000); //Una semana = 604800000, por dia 86400000 
  }



  useEffect((() => {
    renderNavBar()
    deleteNoteResolved();
  }))


  return (
    <div>
      <div className="app__header-wrapper app__bg">
        <div className="app__header-et" id="et">
          <div className="app__header-et">

            {et.map(({ title, id }) => (
              <div key={id}>
                <p className="p__opensans">
                  <AiFillCaretRight style={{ margin: "6px 2px 0 0" }} />
                  <button>
                    <Link to={`notes/${id}`}> {title} </Link>
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

                <p className="p__opensans">
                  <AiFillCaretRight style={{ margin: "6px 2px 0 0" }} />
                  <button>
                    <Link to={`notes/${id}`}> {title} </Link>
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      {isAdmin && < FooterAdm />}
    </div>
  )
};

export default Header;
