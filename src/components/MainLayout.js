// MainLayout.js
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Default true for desktop

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsMenuOpen(!mobile); // Auto-open on desktop
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="main-layout">
      <SideMenu 
        isMobile={isMobile} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <main 
        className="content-area" 
        style={{
          marginLeft: !isMobile && isMenuOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
          padding: '20px 10px', // Added fluid-like padding
          minHeight: '100vh',
          width: `calc(100% - ${!isMobile && isMenuOpen ? '250px' : '0'})` // Ensure proper width calculation
        }}
      >
        <div className="container-fluid px-lg-5"> {/* Nested container-fluid */}
          {children}
        </div>
      </main>
      {isMobile && isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
};

export default MainLayout;