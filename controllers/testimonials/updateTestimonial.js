const { Testimonial } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const id = req.params.id;
  const { name, content } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;
  let uploadedImage;

  if (image) {
    try {
      uploadedImage = await uploadFile(image);
    } catch (error) {
      if (req.app.get('env') === 'development') console.log(error);
    }
  }

  try {
    const testimonialById = await Testimonial.findOne({
      where: { id }
    });

    if (!testimonialById) {
      return res.status(404).json({
        message: `No se encontró un testimonio para el id ${id}`
      });
    };

    testimonialById.name = name;
    if (image && uploadedImage && uploadedImage.Location) {
      testimonialById.image = uploadedImage.Location;
    };
    testimonialById.content = content;

    await testimonialById.save();

    res.status(200).json(testimonialById);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
