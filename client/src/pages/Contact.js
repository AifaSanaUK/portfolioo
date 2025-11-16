import React, { useState } from 'react';
import api from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Client-side validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setStatus({
        type: 'error',
        message: 'Name must be at least 2 characters long.'
      });
      setLoading(false);
      return;
    }

    if (!trimmedEmail) {
      setStatus({
        type: 'error',
        message: 'Email is required.'
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      setLoading(false);
      return;
    }

    if (!trimmedSubject || trimmedSubject.length < 3) {
      setStatus({
        type: 'error',
        message: 'Subject must be at least 3 characters long.'
      });
      setLoading(false);
      return;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      setStatus({
        type: 'error',
        message: 'Message must be at least 10 characters long.'
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/contact', {
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage
      });
      setStatus({
        type: 'success',
        message: response.data.message || 'Message sent successfully!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.response?.data) {
        if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        if (error.response.data.details) {
          if (Array.isArray(error.response.data.details)) {
            errorMessage = error.response.data.details.join(', ');
          } else {
            errorMessage = error.response.data.details;
          }
        }
        if (error.response.data.missing) {
          const missingFields = Object.entries(error.response.data.missing)
            .filter(([_, isMissing]) => isMissing)
            .map(([field]) => field);
          if (missingFields.length > 0) {
            errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="section contact-hero">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Have a project in mind? Let's work together!
          </p>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <a href="mailto:aifasanaauk@gmail.com">aifasanaauk@gmail.com</a>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <a href="tel:97453077450">9745307450</a>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span>Remote | Kerala | Bangalore | Chennai | Delhi</span>
              </div>
              <div className="info-item">
                <span className="info-label">GitHub:</span>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a>
              </div>
              <div className="info-item">
                <span className="info-label">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/aifa-sana-uk-b48532309" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

