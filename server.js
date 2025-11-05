const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./config/database');
const Contact = require('./models/Contact');
const SiteVisit = require('./models/SiteVisit');
const contactRoutes = require('./routes/contacts');
const siteVisitRoutes = require('./routes/siteVisits');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Prakriti Aircon Backend API' });
});

app.use('/api/contacts', contactRoutes);
app.use('/api/site-visits', siteVisitRoutes);

// Database sync and server start
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });