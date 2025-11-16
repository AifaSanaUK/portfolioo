import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All'];

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  return (
    <div className="projects-page">
      <section className="section projects-hero">
        <div className="container">
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">
            A collection of projects I've worked on, showcasing my skills and experience.
          </p>

          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => handleFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="loading-text">Loading projects...</p>
          ) : filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project._id} className="project-card">
                  <div className="project-image-wrapper">
  {project.imageUrl ? (
    <div className="project-image">
      <img 
        src={project.imageUrl} 
        alt={project.title}
        onError={(e) => {
          e.target.style.display = 'none';
          const placeholder = e.target.parentElement.querySelector('.project-image-placeholder');
          if (placeholder) {
            placeholder.style.display = 'flex';
          }
        }}
      />
      <div className="project-image-placeholder" style={{ display: 'none' }}>
        <div className="project-logo-placeholder">
          {project.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  ) : (
    <div className="project-image-placeholder">
      <div className="project-logo-placeholder">
        {project.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
      </div>
    </div>
  )}
</div>

                  <div className="project-content">
                    <span className="project-category">{project.category}</span>
                    <h3 style={{ color: '#888' }}>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies?.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-projects">No projects found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;

