const { Activity } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const activityById = await Activity.findOne({
      where: { id }
    });

    if (!activityById) {
      return res.status(404).json({
        message: 'No se encontró una actividad para el id enviado'
      });
    };

    await activityById.destroy();

    res.status(200).json({ message: 'La actividad fue eliminada' });
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
