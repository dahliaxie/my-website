import React, { useState } from 'react';
import emailjs from 'emailjs-com';

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
    <div>
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      )}
      {isSubmitted && <p>Thank you for your message! I will get back to you soon.</p>}
    </div>
  );
};

export default ContactForm;
