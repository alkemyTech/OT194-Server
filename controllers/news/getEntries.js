const { Entries } = require('../../database/models');

module.exports = async (_req, res) => {
  try {
    const entriesDB = await Entries.findAll({
      where: { type: 'news' }
    });

    if (!entriesDB[0]) {
      return res.status(404).json({
        message: 'No se encontró ninguna novedad'
      });
    };

    res.status(200).json(entriesDB);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
