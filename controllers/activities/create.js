const { Activities } = require('../../database/models');

module.exports = async (req, res) => {
  // Falta manejar correctamente la carga de la imagen de actividad
  const { name, image, content } = req.body;

  try {
    const data = {
      name,
      image,
      content
    };

    const newActivity = Activities.build(data);
    await newActivity.save();

    console.log('create activity', newActivity);
    res.json(newActivity);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error del servidor'
    });
  };
};
