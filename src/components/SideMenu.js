import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFolder, FaUser, FaSearch } from 'react-icons/fa';

// Mapping icon names to actual components
const icons = {
  FaHome: <FaHome />,
  FaFolder: <FaFolder />,
  FaUser: <FaUser />
};

const SideMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Fetch menu data from JSON file
  useEffect(() => {
    fetch('/db/menu.json') // Ensure this is in the `public` folder
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error('Error fetching menu data:', error));
  }, []);

  // Toggle submenu visibility
  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <nav className="p-3">
      {/* Search Bar */}
      <div className="input-group mb-3">
        <span className="input-group-text"><FaSearch /></span>
        <input type="text" className="form-control" placeholder="Search..." />
      </div>

      {/* Menu List */}
      <ul className="list-group">
        {menuItems.map((item) => (
          <li key={item.name} className="list-group-item bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center" onClick={() => toggleSubmenu(item.name)}>
              <div>
                {icons[item.icon]} {/* Render the icon dynamically */}
                <Link to={item.link} className="text-white text-decoration-none ms-2">{item.name}</Link>
              </div>
              {item.submenus.length > 0 && (
                <span className="ms-auto">{expandedMenu === item.name ? '▼' : '▶'}</span>
              )}
            </div>
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
