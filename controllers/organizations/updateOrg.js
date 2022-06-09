const { Organization } = require('../../database/models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, image, phone, address, welcomeText } = req.body;

  try {
    const newOrgId = await Organization.findOne({
      raw: true,
      where: { id }
    });

    if (!newOrgId) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${id}`
      });
    } else {
      const updateOrgData = { name, image, phone, address, welcomeText };

      const updatedOrg = await Organization.update(updateOrgData, { where: { id } });

      res.status(200).json(updatedOrg);
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor'
    });
  }
};
