import React from 'react';
import ContactForm from '../components/ContactForm';
import '../styles/ContactForm.css'; // Assuming ContactForm.css holds styles

const Contact = () => {
  return (
    <section className="contact">
      <h2>Contact</h2> {/* Heading for the contact section */}
      <p>If you have any questions, please feel free to contact me using the form below. </p>
      <ContactForm /> {/* Contact form component */}
    </section>
  );
};

export default Contact;
