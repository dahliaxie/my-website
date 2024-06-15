import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/ContactForm.css'; // Import your CSS file

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

    // Send email using email.js
    emailjs
      .sendForm(
        'service_kw8i26z', // Service ID
        'template_mgcn7ej', // Template ID
        event.target, // HTML form element
        'OyQ_qFx9ZwLHQ596T' // public key
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

          <button type="submit">submit!</button>
        </form>
      )}
      {isSubmitted && <p className="submission-message">thank you for your message! i will get back to you soon.</p>}
    </div>
  );
};

export default ContactForm;
