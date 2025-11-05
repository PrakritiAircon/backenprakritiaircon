const SiteVisit = require('../models/SiteVisit');
const { sendSiteVisitNotification } = require('../utils/emailService');

const scheduleSiteVisit = async (req, res) => {
  try {
    const { name, email, phone, address, preferred_date, preferred_time, service_type, message } = req.body;
    
    if (!name || !email || !phone || !address || !preferred_date || !preferred_time || !service_type) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const siteVisit = await SiteVisit.create({ 
      name, email, phone, address, preferred_date, preferred_time, service_type, message 
    });
    
    // Send email notification
    try {
      await sendSiteVisitNotification({ name, email, phone, address, preferred_date, preferred_time, service_type, message });
      console.log('✅ Site visit email sent successfully to contactprakritiaircon@gmail.com');
    } catch (emailError) {
      console.error('❌ Site visit email failed:', emailError.message);
    }
    
    res.status(201).json({ message: 'Site visit scheduled successfully', id: siteVisit.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule site visit' });
  }
};

const getSiteVisits = async (req, res) => {
  try {
    const siteVisits = await SiteVisit.findAll({ order: [['created_at', 'DESC']] });
    res.json(siteVisits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch site visits' });
  }
};

module.exports = { scheduleSiteVisit, getSiteVisits };