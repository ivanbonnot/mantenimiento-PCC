import React from "react";
import { Link } from "react-router-dom";
import { et, set } from "../../constants/stations";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavBarContext } from "../../context/NavBarContext";
import FooterAdm from '../../components/FooterAdm/FooterAdm'

import "./Header.css";


const Header = () => {
  const isAdmin = localStorage.getItem('admin')
  const { setShouldRenderNavBar, shouldRenderNavBar } = useNavBarContext();
  const renderNavBar = () => {
    console.log(`Render header ${shouldRenderNavBar}`)
    setShouldRenderNavBar(true)
  }
  renderNavBar()

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
