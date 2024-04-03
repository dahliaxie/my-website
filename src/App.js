import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FooterBanner from './components/FooterBanner';
import About from './pages/About';
import './styles/App.css';
import Home from './pages/Home';
import Experience from './pages/Experience';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/" element={<Home />} />
          {/* Add more routes for other pages */}
        </Routes>


        <FooterBanner />
      </div>
    </Router>
  );
};

export default App;
