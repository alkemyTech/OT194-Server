const express = require('express');
const router = express.Router();
const db = require('../models/index');
const Organization = db.Organization;

router.get('/1/public', async function (req, res, next) {
  const organizationData = await Organization.findAll({
    raw: true,
    limit: 1
  });

  const { name, image, phone, address, welcomeText } = organizationData[0];

  res.status(200).json({ name, image, phone, address, welcomeText });
});

module.exports = router;
