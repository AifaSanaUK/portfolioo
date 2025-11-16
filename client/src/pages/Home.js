import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await api.get('/projects/featured');
        setFeaturedProjects(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-image-wrapper">
              <img 
                src="/images/photo4.png" 
                alt="Aifa Sana Uk"
                className="hero-photo"
                onError={(e) => {
                  if (e.target.src.includes('photo4.png')) {
                    e.target.src = '/images/photo1.png';
                  } else {
                    e.target.style.display = 'none';
                  }
                }}
              />
            </div>
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Aifa Sana Uk</span>
            </h1>
            <p className="hero-subtitle">MERN Stack Developer</p>
            <p className="hero-description">
              Passionate developer with 1 year of experience building scalable web applications
              using React, Node.js, MongoDB, and Express.
            </p>
            <div className="hero-buttons">
            <a 
    href="/CV.pdf" 
    download 
    className="btn btn-primary"
    style={{ marginLeft: "10px" }}
  >
    Download CV
  </a>
              <Link to="/projects" className="btn btn-primary">View Projects</Link>
              <Link to="/contact" className="btn">Get In Touch</Link>
            </div>
            <div className="hero-location">
              <span>📍 Available: Remote | Kerala | Bangalore | Chennai | Delhi</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-preview section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-preview-content">
            <p>
              I'm a MERN Stack Developer with a passion for creating innovative solutions
              and beautiful user experiences. I completed my MERN Stack course from Brototype
              Institute and hold a BA in English. I'm always eager to learn new technologies
              and take on challenging projects.
            </p>
            <Link to="/about" className="btn">Learn More</Link>
          </div>
        </div>
      </section>
   
      <section className="featured-projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          {loading ? (
            <p>Loading projects...</p>
          ) : featuredProjects.length > 0 ? (
            <div className="projects-grid">
              {featuredProjects.map((project) => (
                <div key={project._id} className="project-card">
                  <h3 style={{ color: '#888' }}>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <Link to="/projects" className="btn">View All Projects</Link>
                </div>
              ))}
    
            </div>
          ) : (
            <p>No featured projects available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

