import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="section about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-image">
              <img
                src="/images/photo1.png"
                alt="Aifa Sana Uk"
                className="profile-photo"
                onError={(e) => {
                  if (e.target.src.includes('.png')) {
                    e.target.src = '/images/photo1.jpg';
                  } else if (e.target.src.includes('.jpg')) {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }
                }}
              />
              <div className="image-placeholder" style={{ display: 'none' }}>
                <span>AS</span>
              </div>
            </div>
            <div className="about-text-content">
              <h1 className="page-title">About Me</h1>
              <p className="lead-text">
                I'm Aifa Sana Uk, a passionate MERN Stack Developer with a love for creating
                innovative solutions and beautiful user experiences.
              </p>
              <p>
                With 1 year of experience in web development, I specialize
                in building scalable applications using modern technologies like
                React, Node.js, MongoDB, and more. I completed my MERN Stack course
                from Brototype Institute and hold a BA in English. I'm always eager to learn new
                technologies and take on challenging projects.
              </p>
              <div className="location-info">
                <h3>📍 Location</h3>
                <p>Available for work: Remote | Kerala | Bangalore | Chennai | Delhi</p>
              </div>
              <div className="social-info">
                <h3>Connect</h3>
                <div className="social-links">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/aifa-sana-uk-b48532309" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-details">
        <div className="container">
          <div className="about-grid">
            <div className="about-card">
              <h3>Education</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <h4>BA in English</h4>
                  <p className="timeline-date">Completed</p>
                  <p>Bachelor's Degree</p>
                </div>
                <div className="timeline-item">
                  <h4>MERN Stack Development</h4>
                  <p className="timeline-date">Completed</p>
                  <p>Brototype Institute</p>
                </div>
              </div>
            </div>

            <div className="about-card">
              <h3>Experience</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <h4>MERN Stack Developer</h4>
                  <p className="timeline-date">1 Year</p>
                  <p>Full Stack Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">My Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Quality First</h3>
              <p>I believe in writing clean, maintainable code that stands the test of time.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Always exploring new technologies and best practices to deliver cutting-edge solutions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Working closely with clients and teams to achieve shared goals.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Problem Solving</h3>
              <p>Turning complex challenges into elegant, simple solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section hobbies-section">
        <div className="container">
          <h2 className="section-title">When I'm Not Coding</h2>
          <div className="hobbies-grid">
            <div className="hobby-item">
              <h4>📚 Reading</h4>
              <p>Tech blogs, programming books, and industry news</p>
            </div>
            <div className="hobby-item">
              <h4>🎮 Gaming</h4>
              <p>Strategy games and indie titles</p>
            </div>
            <div className="hobby-item">
              <h4>🏋️ Fitness</h4>
              <p>Staying active and healthy</p>
            </div>
            <div className="hobby-item">
              <h4>✈️ Traveling</h4>
              <p>Exploring new places and cultures</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

