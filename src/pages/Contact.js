import React from 'react';
import ContactForm from '../components/ContactForm';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Correct import path for icons
import '../styles/ContactForm.css'; // Correct import path for CSS file

const Contact = () => {
  const handleViewResume = () => {
    // Replace with logic to view/download your resume
    window.open('/Xie_Dahlia_Resume.pdf', '_blank');
  };

  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2>contact</h2>
        <p>if you have any questions, please feel free to contact me using the form below.</p>
        <div className="button-group">
          <button className="resume-button" onClick={handleViewResume}>view resume!</button>
        </div>
        <div className="social-icons">
          <a href="https://github.com/dahliaxie" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/dahlia-xie" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
};

export default Contact;
