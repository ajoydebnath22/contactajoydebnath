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
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
      setTimeout(() => setFadeOut(true), 2000);
      setTimeout(() => {
        setSearchTerm("");
        setNoResults(false);
        setFadeOut(false);
      }, 3000);
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
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Search Bar (Prevents Closing on Click) */}
        <div className="input-group mb-3" onClick={(e) => e.stopPropagation()}>
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className={`form-control ${fadeOut ? "fade-out" : "fade-in"}`}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  <div className="menu-item-truncate">
                    {icons[item.icon]}
                    <Link
                      to={item.link}
                      className="text-white text-decoration-none ms-2"
                      onClick={() => isMobile && setIsMenuOpen(false)}
                      title={item.name} // Tooltip for full name on hover
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
                            className="text-white text-decoration-none menu-item-truncate"
                            onClick={() => isMobile && setIsMenuOpen(false)}
                            title={submenu.name}
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
              <li className="list-group-item text-center text-white fade-in">
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
