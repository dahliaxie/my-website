import React from 'react';
import ContactForm from '../components/ContactForm';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Correct import path for icons
import '../styles/ContactForm.css'; // Correct import path for CSS file

const Contact = () => {

  return (
    <section className="contact-section">
      <div className="contact-content">
        <h2>contact</h2>
        <p>if you have any questions, please feel free to contact me using the form below.</p>
      </div>
      <ContactForm />
        <div className="social-icons">
          <a href="https://github.com/dahliaxie" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/dahlia-xie" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
    </section>
  );
};

export default Contact;
