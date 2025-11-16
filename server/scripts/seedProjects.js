const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

const projects = [
  {
    title: 'Book Wagon',
    description:
      'A full-stack book selling application built with React, Node.js, MongoDB, and Express. Features include user authentication, book listings, shopping cart, and order management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    category: 'Full Stack',
    featured: true,
    imageUrl: '/images/logos/bookwagon-logo.png',
    liveUrl: 'https://bookwagons.shop',
    githubUrl: 'https://github.com/AifaSanaUK/Book-Wagons.git',
  },

  {
    title: 'Netflix',
    description:
      'A Netflix-inspired streaming platform built with React and Redux. Integrated with TMDb API for movie data.',
    technologies: ['React', 'Redux', 'TMDb API', 'JavaScript', 'CSS'],
    category: 'Frontend',
    featured: true,
    imageUrl: '/images/logos/netflix-logo.png',
  },

  {
    title: 'OLX',
    description:
      'A classifieds marketplace application with product listings, search functionality, and user profiles.',
    technologies: ['React', 'Redux', 'JavaScript', 'CSS'],
    category: 'Frontend',
    featured: true,
    imageUrl: '/images/logos/olx-logo.png',
    githubUrl: 'https://github.com/AifaSanaUK/olx.git',
  },



  {
    title: 'Reddit ',
    description:
      'A full-featured Reddit-style forum application with posts, comments, voting, and user authentication.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'Full Stack',
    featured: true,
    imageUrl: '/images/logos/redis-logo.png',
    githubUrl: 'https://github.com/AifaSanaUK/reddit-clone',
    liveUrl: 'https://yourredditclone.live'
  },



  {
    title: 'Todo List App',
    description:
      'A todo list app with add, edit, delete, and mark complete functionality.',
    technologies: ['React', 'JavaScript', 'CSS'],
    category: 'Frontend',
    imageUrl: '/images/logos/todo-logo.png',
  },



  {
    title: 'Alarm Clock App',
    description:
      'A functional alarm clock app with alarm setting and notifications.',
    technologies: ['React', 'JavaScript', 'CSS'],
    category: 'Frontend',
    imageUrl: '/images/logos/alarm-logo.png',
  },
];

async function seedProjects() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    await Project.insertMany(projects);
    console.log(`✅ Seeded ${projects.length} projects`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
