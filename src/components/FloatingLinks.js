import React, { useState } from "react";
import { FaYoutube, FaTelegramPlane, FaLink, FaBars, FaTimes } from "react-icons/fa";
import "./FloatingLinks.css"; // Include this CSS

const FloatingLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-links-container">
      {/* Floating Button */}
      <button className="floating-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaLink /> : <FaLink />}
      </button>

      {/* Links Sliding Left */}
      <div className={`links ${isOpen ? "open" : ""}`}>
        
        <a href="https://t.me/contactajoydebnath" target="_blank" rel="noopener noreferrer" className="link telegram">
          <FaTelegramPlane /> Join
        </a>
        
        <a href="https://www.youtube.com/channel/UCSgQQLPQ9NhPVAnubCzkcGQ" target="_blank" rel="noopener noreferrer" className="link youtube">
          <FaYoutube /> Subscribe
        </a>
        
        {/*
        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="link general">
          <FaLink /> Website
        </a> */}
      </div>
    </div>
  );
};

export default FloatingLinks;
