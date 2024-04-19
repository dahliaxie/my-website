import React, { useState } from 'react';
import '../styles/ContactForm.css' // Assuming ContactForm.css holds styles

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission state

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !validateEmail(formData.email)) {
      console.error('Validation failed: Name, email, and valid email are required.');
      return; // Prevent form submission if validation fails
    }

    // Handle form submission here (e.g., send data to server)
    console.log('Form Submitted:', formData);
    setIsSubmitted(true); // Set submitted state for confirmation message
    setFormData({ name: '', email: '', message: '' }); // Clear form after submit
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Name Input */}
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Email Input */}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Message TextArea */}
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />

      {/* Submit Button */}
      <button type="submit">Send Message</button>

      {/* Confirmation Message (conditionally rendered) */}
      {isSubmitted && (
        <p className="confirmation-message">
          Thank you for your message! We will get back to you soon.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
