const db = require('../../models');
const Organization = db.Organization;

module.exports = async (req, res, next) => {
  const organizationData = await Organization.findAll({
    raw: true,
    limit: 1
  });

  const { name, image, phone, address, welcomeText } = organizationData[0];

  res.status(200).json({ name, image, phone, address, welcomeText });
};
