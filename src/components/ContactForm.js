import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaFilePdf } from 'react-icons/fa';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        'service_kw8i26z',
        'template_mgcn7ej',
        event.target,
        'OyQ_qFx9ZwLHQ596T'
      )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  const handleViewResume = () => {
    window.open('/Xie_Dahlia_Resume.pdf', '_blank');
  };

  return (
    <div className="contact-form-container">
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="button-container">
            <button type="submit" className="submit-button">submit</button>
            <button type="button" className="resume-button" onClick={handleViewResume}>
              view resume <FaFilePdf />
            </button>
          </div>
        </form>
      )}
      {isSubmitted && <p className="submission-message">thank you for your message! i will get back to you soon.</p>}
    </div>
  );
};

export default ContactForm;
