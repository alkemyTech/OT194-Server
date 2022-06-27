const { Organization } = require('../../database/models');

module.exports = async (req, res, next) => {
  try {
    const organizationData = await Organization.findAll({
      attributes: {
        exclude: ['id', 'deletedAt', 'createdAt', 'updatedAt']
      },
      raw: true,
      limit: 1
    });

    if (!organizationData[0]) {
      return res.status(404).json({
        message: 'No se encontró la información de la organización'
      });
    };

    res.status(200).json(organizationData[0]);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
