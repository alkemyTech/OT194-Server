const { Entries } = require('../../database/models');

module.exports = async (_req, res) => {
  try {
    const newsData = await Entries.findAll({});

    if (!newsData[0]) {
      return res.status(404).json({
        message: 'No se encontró ninguna novedad'
      });
    };

    res.status(200).json(newsData);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
