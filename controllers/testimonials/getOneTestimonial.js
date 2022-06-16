const { Testimonial } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({
        message: `No se encontró una novedad para el id ${id}`
      });
    };

    res.status(200).json(testimonial);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
