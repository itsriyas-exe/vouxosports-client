import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DropdownProfile from './DropdownProfile';
import ('../styles/header.css')

function Header() {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <header className="dashboard-header d-flex">
        <Link to={'/home'} className="logolink">
          <div>
            <div className="logo">VouxoSports</div>
            </div>
        </Link>
        <div className="search-bar">
          <FaRegUserCircle
            size={25}
            className="mt-1 ms-3 user-icon"
            onClick={() => setOpenProfile((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          />
          {openProfile && <DropdownProfile />}
        </div>
      </header>
    </>
  );
}

export default Header;
