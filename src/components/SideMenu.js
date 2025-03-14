import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFolder, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './SideMenu.css';

const icons = {
  FaHome: <FaHome />,
  FaFolder: <FaFolder />,
  FaUser: <FaUser />
};

const SideMenu = ({ isMobile, isMenuOpen, setIsMenuOpen }) => {

  const [menuItems, setMenuItems] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Fetch menu data
  useEffect(() => {
    fetch('/db/menu.json')
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu data:', error));
  }, []);

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <>

      {/* Existing mobile toggle */}
      {isMobile && (
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '' : <FaBars />}
        </button>
      )}

       <nav className="side-menu" style={{
        transform: isMobile 
          ? `translateX(${isMenuOpen ? '0' : '-100%'})`
          : `translateX(${isMenuOpen ? '0' : '-250px'})`
       }}>

        {/* Search Bar */}
        <div className="input-group mb-3">
          <span className="input-group-text"><FaSearch /></span>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>

        {/* Menu List */}
        <ul className="list-group">
          {menuItems.map((item) => (
            <li key={item.name} className="list-group-item bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center" 
                   onClick={() => toggleSubmenu(item.name)}>
                <div>
                  {icons[item.icon]}
                  <Link 
                    to={item.link} 
                    className="text-white text-decoration-none ms-2"
                    onClick={() => isMobile && setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
                {item.submenus.length > 0 && (
                  <span className="ms-auto">{expandedMenu === item.name ? '▼' : '▶'}</span>
                )}
              </div>
              {expandedMenu === item.name && (
                <ul className="list-group mt-2">
                  {item.submenus.map((submenu) => (
                    <li key={submenu.name} className="list-group-item bg-secondary">
                      <Link 
                        to={submenu.link} 
                        className="text-white text-decoration-none"
                        onClick={() => isMobile && setIsMenuOpen(false)}
                      >
                        {submenu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {isMobile && isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default SideMenu;