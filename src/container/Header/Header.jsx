import React from "react";
import stations from "../../constants/stations";
import {AiFillCaretRight} from 'react-icons/ai'

import "./Header.css";

const Header = () => (
  <div className="app__header-wrapper app__bg flex__center">
    <div className="app__header-et" id="et">
      <div className="">
        {stations.et.map(({ title }) => (
          <p className="p__opensans">{title}</p>
        ))}
      </div>
    </div>

    <div className="app__header-set" id="set">
      <div className=''>
        {stations.set.map(({ title }) => (
          <p className="p__opensans">{title}</p>
        ))}
      </div>
    </div>

  </div>
);

export default Header;
