import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FooterBanner from './components/FooterBanner';
import About from './pages/About.js';
import './styles/index.css';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Contact from './pages/Contact'
import Sample from './pages/Sample'
import Test from './pages/Test.js';
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/v1" element={<Sample />} />
          <Route path="/v2" element={<Test />} />
          <Route path="/" element={<Home />} />
          {/* Add more routes for other pages */}
        </Routes>


        <FooterBanner />
      </div>
    </Router>
  );
};

export default App;
