import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFolder, FaUser, FaSearch } from 'react-icons/fa';

const SideMenu = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);

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

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <nav className="p-3">
      {/* Search Bar */}
      <div className="input-group mb-3">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input type="text" className="form-control" placeholder="Search..." />
      </div>

      {/* Menu Items */}
      <ul className="list-group">
        {menuItems.map((item) => (
          <li key={item.name} className="list-group-item bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center" onClick={() => toggleSubmenu(item.name)}>
              <div>
                {item.icon} <Link to={item.link} className="text-white text-decoration-none ms-2">{item.name}</Link>
              </div>
              {item.submenus.length > 0 && (
                <span className="ms-auto">{expandedMenu === item.name ? '▼' : '▶'}</span>
              )}
            </div>
            {/* Submenus */}
            {expandedMenu === item.name && (
              <ul className="list-group mt-2">
                {item.submenus.map((submenu) => (
                  <li key={submenu.name} className="list-group-item bg-secondary">
                    <Link to={submenu.link} className="text-white text-decoration-none">{submenu.name}</Link>
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
