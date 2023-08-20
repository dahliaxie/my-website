import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FooterBanner from './components/FooterBanner';
import './styles/App.css';
import Home from './pages/Home';
import Experience from './components/Experience';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="background"></div> {/* Add this element */}
        <Header />
        <Routes>
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
