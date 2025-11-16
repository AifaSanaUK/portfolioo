const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Trim and validate required fields
    const trimmedName = name ? name.trim() : '';
    const trimmedEmail = email ? email.trim() : '';
    const trimmedSubject = subject ? subject.trim() : '';
    const trimmedMessage = message ? message.trim() : '';

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      const missing = {
        name: !trimmedName,
        email: !trimmedEmail,
        subject: !trimmedSubject,
        message: !trimmedMessage
      };
      const missingFields = Object.entries(missing)
        .filter(([_, isMissing]) => isMissing)
        .map(([field]) => field);
      
      return res.status(400).json({
        error: 'All fields are required',
        missing: missing,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate minimum lengths
    if (trimmedName.length < 2) {
      return res.status(400).json({
        error: 'Name must be at least 2 characters long'
      });
    }

    if (trimmedSubject.length < 3) {
      return res.status(400).json({
        error: 'Subject must be at least 3 characters long'
      });
    }

    if (trimmedMessage.length < 10) {
      return res.status(400).json({
        error: 'Message must be at least 10 characters long'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Check if MongoDB is connected before attempting to save
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database not connected. Please check MongoDB connection.',
        details: 'MongoDB connection state: ' + mongoose.connection.readyState
      });
    }

    const contact = new Contact({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage
    });

    await contact.save();

    // Send email notification to portfolio owner
    const recipientEmail = process.env.EMAIL_USER || 'aifasanaauk@gmail.com';
    const senderEmail = process.env.EMAIL_USER || 'aifasanaauk@gmail.com';
    const emailPassword = process.env.EMAIL_PASS;

    if (emailPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: senderEmail,
            pass: emailPassword
          }
        });

        const mailOptions = {
          from: senderEmail,
          to: recipientEmail,
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3b82f6; background: #0a0a0a; padding: 20px; border-radius: 5px;">
                New Contact Message from Portfolio
              </h2>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="background: white; padding: 15px; border-left: 4px solid #3b82f6; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
              <p style="margin-top: 20px; color: #666; font-size: 12px;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', recipientEmail);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails, message is still saved to DB
      }
    } else {
      console.log('Email not configured. Set EMAIL_USER and EMAIL_PASS in .env file');
      console.log('Message saved to database. Configure email to receive notifications.');
    }

    res.status(201).json({
      message: 'Contact message sent successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    // Handle MongoDB connection errors
    if (error.name === 'MongoServerError' ||
        error.message.includes('Mongo') ||
        error.message.includes('buffering') ||
        error.message.includes('timeout')) {
      return res.status(503).json({
        error: 'Database connection error. MongoDB is not running or not accessible.',
        details: 'Please start MongoDB and try again. See FIX_MONGODB_TIMEOUT.md for help.'
      });
    }

    res.status(400).json({
      error: error.message || 'Failed to send message. Please try again.'
    });
  }
});

// GET /api/contact/test - Test endpoint
router.get('/test', (req, res) => {
  res.json({
    message: 'Contact API is working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

