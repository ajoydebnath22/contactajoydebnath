import './App.css';
import SideMenu from './components/SideMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
function App() {
  return (
    <div className="App">
     <SideMenu />
     <div className="content">
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/java" element={<ContentPage topic="Java"/>} />
        <Route path="/categories/javascript" element={<ContentPage topic="Java"/>} />
        <Route path="/categories/react" element={<ContentPage topic="Java"/>} />
        <Route path="/categories/nodejs" element={<ContentPage topic="Java"/>} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
