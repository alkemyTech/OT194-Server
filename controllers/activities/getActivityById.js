const { Activity } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const activityDB = await Activity.findByPk(id);

    if (!activityDB) {
      return res.status(404).json({
        message: `No se encontró una novedad con el ID ${id}`
      });
    };

    res.status(200).json(activityDB);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
