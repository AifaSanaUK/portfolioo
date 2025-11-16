import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'CSS', level: 85 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Bootstrap', level: 80 },
        { name: 'Tailwind CSS', level: 75 }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'RESTful API', level: 80 },
        { name: 'JWT', level: 70 }
      ]
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git', level: 80 },
        { name: 'AWS', level: 65 },
        { name: 'React Router', level: 75 },
        { name: 'Redux', level: 70 }
      ]
    }
  ];

  const certifications = [
    {
      title: 'MERN Stack Development',
      institution: 'Brototype Institute',
      status: 'Completed'
    },
    {
      title: 'MERN Stack Internship',
      institution: 'Unified Mentor',
      status: 'Completed'
    },
    {
      title: 'AI Powered Tools',
      institution: 'Bex10',
      status: 'Completed'
    },
    {
      title: 'Data Analysis',
      institution: 'Office Master',
      status: 'Completed'
    },
    {
      title: 'BA in English',
      institution: 'University',
      status: 'Completed'
    }
  ];

  return (
    <div className="skills-page">
      <section className="section skills-hero">
        <div className="container">
          <h1 className="page-title">Skills & Certifications</h1>
          <p className="page-subtitle">
            Technologies and tools I work with
          </p>

          <div className="skills-container">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="skill-category">
                <h2 className="category-title">{category.category}</h2>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="certifications-section">
            <h2 className="section-title">Certifications</h2>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-card">
                  <h3>{cert.title}</h3>
                  <p className="cert-institution">{cert.institution}</p>
                  <span className="cert-status">{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;

