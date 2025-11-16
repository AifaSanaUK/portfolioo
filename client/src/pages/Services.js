import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Building responsive and modern web applications using React, Node.js, and MongoDB.'
    },
    {
      icon: '📱',
      title: 'Frontend Development',
      description: 'Creating beautiful and interactive user interfaces with React, HTML, CSS, and JavaScript.'
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      description: 'Developing robust server-side applications with Node.js, Express, and MongoDB.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Designing user-friendly interfaces with a focus on user experience and modern design principles.'
    },
    {
      icon: '🔧',
      title: 'API Development',
      description: 'Creating RESTful APIs and integrating third-party services for seamless functionality.'
    },
    {
      icon: '🚀',
      title: 'Full Stack Solutions',
      description: 'End-to-end development of web applications from design to deployment.'
    }
  ];

  return (
    <div className="services-page">
      <section className="section services-hero">
        <div className="container">
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">
            What I can do for you
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

