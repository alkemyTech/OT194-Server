const { Entries } = require('../../database/models');

module.exports = async (req, res) => {
  const entryUUID = req.params.id;

  try {
    const newById = await Entries.findOne({
      raw: true,
      where: { entryUUID }
    }, { include: ['slide'] });

    if (!newById) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${entryUUID}`
      });
    };

    res.status(200).json(newById);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
