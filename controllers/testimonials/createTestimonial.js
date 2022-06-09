const { Testimonial } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
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
    const data = {
      image: (uploadedImage && uploadedImage.Location) ? uploadedImage.Location : null,
      name,
      content
    };
    const newTestimonial = Testimonial.build(data);
    await newTestimonial.save();

    res.status(201).json(newTestimonial);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  };
};
