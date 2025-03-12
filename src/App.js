import './App.css';
import SideMenu from './components/SideMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
function App() {
  return (
    <div className="container-fluid">
        <div className="row">
          {/* Sidebar - 3 columns on medium screens and up, full-width on small screens */}
          <div className="col-md-3 col-12 bg-dark text-white vh-100">
            <SideMenu />
          </div>

          {/* Main Content - 9 columns on medium screens, full width on small screens */}
          <div className="col-md-9 col-12 p-4">
          <Routes>
            <Route path="/categories/:topic" element={<ContentPage />} />
          </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
