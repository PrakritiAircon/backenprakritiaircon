const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/emailService');

const createContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, phone, service, message });
    
    // Send email notification
    try {
      console.log('🔍 Attempting to send email with:', {
        user: process.env.EMAIL_USER,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT
      });
      await sendContactNotification({ name, email, phone, service, message });
      console.log('✅ Email sent successfully to contactprakritiaircon@gmail.com');
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError.message);
    }
    
    res.status(201).json({ message: 'Contact created successfully', id: contact.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['created_at', 'DESC']] });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

module.exports = { createContact, getContacts };