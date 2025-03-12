import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCode, FaFolder, FaUser, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import './SideMenu.css';

const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  //const [isDarkMode, setIsDarkMode] = useState(false);

  // Menu data
  const menuItems = [
    {
      name: 'Home',
      link: '/',
      icon: <FaHome />,
      submenus: [],
    },
    {
      name: 'Java',
      link: '/java',
      icon: <FaFolder />,
      submenus: [
        { name: 'JavaScript', link: '/categories/javascript' },
        { name: 'React', link: '/categories/react' },
        { name: 'Node.js', link: '/categories/nodejs' },
      ],
    },
    {
      name: 'About',
      link: '/about',
      icon: <FaUser />,
      submenus: [],
    },
  ];

  // Toggle submenu visibility
  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  // Toggle dark/light mode
  /*const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };*/

  return (
    <nav className={`side-menu ${true ? 'dark' : 'light'}`}>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search posts..." />
      </div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <div
              className="menu-item"
              onClick={() => toggleSubmenu(item.name)}
            >
              <span className="icon">{item.icon}</span>
              <Link to={item.link}>{item.name}</Link>
              {item.submenus.length > 0 && (
                <span className="arrow">
                  {expandedMenu === item.name ? '▼' : '▶'}
                </span>
              )}
            </div>
            {expandedMenu === item.name && item.submenus.length > 0 && (
              <ul className="submenu">
                {item.submenus.map((submenu) => (
                  <li key={submenu.name}>
                    <Link to={submenu.link}>{submenu.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideMenu;