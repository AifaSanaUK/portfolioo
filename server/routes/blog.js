const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create blog post
router.post('/', async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

