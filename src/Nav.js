import React from 'react';
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="wrapper">
      <div>
        <Link to="/Menu" className="nav-link">
          <FontAwesomeIcon icon={faBars} />
        </Link>
      </div>
      <div>
        <Link to="/MainPage" className="nav-link">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </div>
      <div>
        <Link to="/MyPage" className="nav-link">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
