const { Entries, Slide } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const entryDb = await Entries.findByPk(id, {
      include: [
        {
          model: Slide,
          attributes: ['imageUrl', 'text', 'order']
        }
      ]
    });

    if (!entryDb) {
      return res.status(404).json({
        message: 'No se encontró una novedad con el ID enviado'
      });
    };

    res.status(200).json(entryDb);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
