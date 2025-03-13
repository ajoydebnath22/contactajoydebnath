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
      
      <main className="content-area" style={{
        marginLeft: !isMobile && isMenuOpen ? '250px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {children}
      </main>

      {isMobile && isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  );
};

export default MainLayout;