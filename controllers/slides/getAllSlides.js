const { Slide } = require('../../database/models');

module.exports = async (req, res) => {
  const newsId = req.params.newsId;
  try {
    const slides = await Slide.findAll({
      where: { newsId }
    });

    if (!slides[0]) {
      return res.status(404).json({
        message: 'No se encontró ninguna novedad'
      });
    };

    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
