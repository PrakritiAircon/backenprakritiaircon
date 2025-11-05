const express = require('express');
const { scheduleSiteVisit, getSiteVisits } = require('../controllers/siteVisitController');

const router = express.Router();

router.post('/', scheduleSiteVisit);
router.get('/', getSiteVisits);

module.exports = router;