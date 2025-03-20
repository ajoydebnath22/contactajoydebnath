import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFolder, FaUser, FaSearch, FaBars } from "react-icons/fa";
import "./SideMenu.css";

const icons = {
  FaHome: <FaHome />,
  FaFolder: <FaFolder />,
  FaUser: <FaUser />,
};

const SideMenu = ({ isMobile, isMenuOpen, setIsMenuOpen }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  const [noResults, setNoResults] = useState(false); // Track if no results found

  // Fetch menu data
  useEffect(() => {
    fetch("/db/menu.json")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu data:", error));
  }, []);

  const toggleSubmenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  // **Filter menu items based on search term**
  const filteredMenu = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submenus.some((submenu) =>
        submenu.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // **Handle No Menu Found Smoothly**
  useEffect(() => {
    if (searchTerm && filteredMenu.length === 0) {
      setNoResults(true);
      const timeout = setTimeout(() => {
        setSearchTerm(""); // Clear search input after 3 seconds
        setNoResults(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm, filteredMenu]);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "" : <FaBars />}
        </button>
      )}

      <nav
        className="side-menu"
        style={{
          transform: isMobile
            ? `translateX(${isMenuOpen ? "0" : "-100%"})`
            : `translateX(${isMenuOpen ? "0" : "-250px"})`,
          transition: "transform 0.3s ease-in-out", // Smooth transition
        }}
      >
        {/* Search Bar */}
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>

        {/* Filtered Menu List */}
        <ul className="list-group">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <li key={item.name} className="list-group-item bg-dark text-white">
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => toggleSubmenu(item.name)}
                >
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
                    <span className="ms-auto">
                      {expandedMenu === item.name ? "▼" : "▶"}
                    </span>
                  )}
                </div>
                {expandedMenu === item.name && (
                  <ul className="list-group mt-2">
                    {item.submenus
                      .filter((submenu) =>
                        submenu.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((submenu) => (
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
            ))
          ) : (
            noResults && (
              <li className="list-group-item text-center fade-in No-Menu-Data-Found">
                No menu found
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {isMobile && isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default SideMenu;
