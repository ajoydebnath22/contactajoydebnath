import './App.css';
import MainLayout from './components/MainLayout';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
function App() {
  return (
    <div className='container-fluid'>
        <MainLayout>
          <Routes>
            <Route path="/categories/:topic" element={<ContentPage />} />
          </Routes>
        </MainLayout>
    </div>

  );
}

export default App;
