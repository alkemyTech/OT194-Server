const { Entries } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const newToDelete = await Entries.findOne({
      raw: true,
      where: { id }
    });

    if (!newToDelete) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${id}`
      });
    }

    await Entries.deleteOne({
      where: { id }
    });

    res.status(200).json({
      message: `Se elimino la novedad con el id ${id}`
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
