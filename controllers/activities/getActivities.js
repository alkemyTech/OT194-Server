const { Activity } = require('../../database/models');

module.exports = async (req, res) => {
  try {
    const activities = await Activity.findAll();

    if (!activities) {
      return res.status(404).json({
        message: 'No se encontraron actividades'
      });
    };

    res.status(200).json(activities);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
