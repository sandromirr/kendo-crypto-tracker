import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar } from '@progress/kendo-react-layout';
import { SvgIcon } from '@progress/kendo-react-common';
import { menuIcon, homeIcon, gridIcon } from '@progress/kendo-svg-icons';
import '../styles/Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || 
    (path !== '/' && location.pathname.startsWith(path));
  return (
    <AppBar className="app-bar">
      <Link to="/" className="app-title">
        Crypto Tracker
      </Link>
      <nav>
        <ul className="app-bar-actions">
          <li>
            <Link 
              to="/" 
              className={`k-button k-button-md k-rounded-md k-button-flat ${isActive('/') ? 'k-button-selected' : ''}`}
            >
              <SvgIcon icon={homeIcon} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/portfolio" 
              className={`k-button k-button-md k-rounded-md k-button-flat ${isActive('/portfolio') ? 'k-button-selected' : ''}`}
            >
              <SvgIcon icon={gridIcon} />
              <span>Portfolio</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/coins" 
              className={`k-button k-button-md k-rounded-md k-button-flat ${isActive('/coins') ? 'k-button-selected' : ''}`}
            >
              <SvgIcon icon={menuIcon} />
              <span>Coins</span>
            </Link>
          </li>
        </ul>
      </nav>
    </AppBar>
  );
};

export default Header;
