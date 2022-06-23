const { Entries } = require('../../database/models');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const entryDb = await Entries.findByPk(id);

    if (!entryDb) {
      return res.status(404).json({
        message: `No se encontró una novedad con el ID ${id}`
      });
    }

    await entryDb.destroy();

    res.status(200).json({
      message: `Se elimino la novedad con el ID ${id}`
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
