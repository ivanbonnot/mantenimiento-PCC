import React from "react";
import { Link } from "react-router-dom";
import stations from "../../constants/stations";
import { AiFillCaretRight } from "react-icons/ai";

import "./Header.css";

const Header = () => (
  <div className="app__header-wrapper app__bg">
    <div className="app__header-et et" id="et">
      <div className="app__header-et">
        {stations.et.map(({ title }) => (
          <p className="p__opensans">
            <AiFillCaretRight style={{ margin: "6px 2px 0 0" }} />
            <a href="">
              <Link to={`notes`}> {title} </Link>
            </a>
          </p>
        ))}
      </div>
    </div>

    <div className="app__header-set" id="set">
      <div className="app__header-set set">
        {stations.set.map(({ title }) => (
          <p className="p__opensans">
            <AiFillCaretRight style={{ margin: "6px 2px 0 0" }} />
            <a href="">
              <Link to={`notes`}> {title} </Link>
            </a>
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default Header;
