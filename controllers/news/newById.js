const { Entries, Slide } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const newById = await Entries.findByPk(id, {
      include: [
        {
          model: Slide,
          attributes: ['imageUrl', 'text', 'order']
        }
      ]
    });

    if (!newById) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${id}`
      });
    };

    console.log(newById);
    res.status(200).json(newById);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
