const { Testimonial } = require('../../database/models');

module.exports = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();

    if (!testimonials) {
      return res.status(404).json({
        message: 'No se encontraron novedades'
      });
    };

    res.status(200).json(testimonials);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
