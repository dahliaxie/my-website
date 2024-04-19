import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit the form
    // You can use Netlify's form submission handling or your own server-side logic here
    // For Netlify forms, simply submit the form without any additional JavaScript handling

    console.log('Form Submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true); // Set the state to true after form submission
  };

  return (
    <div>
      {!isSubmitted ? ( // Render the form if not submitted
        <form onSubmit={handleSubmit} className="contact-form" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" /> {/* Hidden form name field */}
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
      ) : (
        // Render the confirmation message if submitted
        <p>Thank you for your message! I will get back to you soon.</p>
      )}
    </div>
  );
};

export default ContactForm;
