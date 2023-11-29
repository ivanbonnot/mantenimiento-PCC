import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { et, set } from "../../constants/stations";
import { AiFillCaretRight } from "react-icons/ai";
import FooterAdm from '../../components/Footer/FooterAdm'
import FooterUser from '../../components/Footer/FooterUser'
import { ClipLoader } from "react-spinners"

import "./Header.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Header = () => {
  const [noteData, setNoteData] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false)

  const isAdmin = localStorage.getItem('admin')

  const loadNotes = useCallback(() => {
    setIsLoadingNotes(true)
    axios
      .get(`${apiUrl}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const note = res.data.notes
        setNoteData(note);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingNotes(false))
  }, []);

  useEffect(() => {

    loadNotes()

  }, [loadNotes])

  return (
    <div>
      <div className="app__header-wrapper app__bg ">
        <div className="app__header-et">
          <h2>ET :</h2>
          {et.map(({ title, id }) => (
            <div key={id}>
              <Link to={`notes/${id}`}>
                <button className="et">
                  <p>
                    {title}
                    {isLoadingNotes ?
                      <span style={{ marginTop: '4px', marginLeft: '4px' }}>
                        <ClipLoader size={25} color="#fff" />
                      </span>
                      :
                      <span style={{ color: noteData.filter((item) => item.estacion === id).length >= 1 ? "red" : "" }}>
                        ({noteData.filter((item) => item.estacion === id).length})
                      </span>
                    }

                  </p>
                  <span className="arrow">
                    <AiFillCaretRight size={25} style={{ marginTop: '4px' }} />
                  </span>

                </button>
              </Link>
            </div>
          ))}
        </div>

        <h2 className="set-title">SET :</h2>
        <div className="app__header-set">

          {set.map(({ title, id }) => (
            <div key={id}>
              <button className="set">
                <p>
                  <Link to={`notes/${id}`}> {title}
                    <span style={{ color: noteData.filter((item) => item.estacion === id).length >= 1 ? "red" : "" }}>
                      ({noteData.filter((item) => item.estacion === id).length})
                    </span>
                  </Link>
                </p>
                <span className="arrow">
                  <AiFillCaretRight size={25} style={{ marginTop: '4px' }} />
                </span>
              </button>
            </div>
          ))}
        </div>

      </div >
      {isAdmin === true ? <FooterAdm /> : < FooterUser />}
    </div >
  )
};

export default Header;
