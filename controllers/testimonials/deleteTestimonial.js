const { Testimonial } = require('../../database/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const testimonialById = await Testimonial.findOne({
      where: { id }
    });

    if (!testimonialById) {
      return res.status(404).json({
        message: `No se encontró un testimonio para el id ${id}`
      });
    };

    await testimonialById.destroy();

    res.status(200).json({ message: 'El testimonio fue eliminado' });
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
