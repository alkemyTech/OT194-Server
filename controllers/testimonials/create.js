const { Testimonials } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  /*
    Falta manejar correctamente la obtencion de la imagen de actividad,
  */
  const { name, content } = req.body;
  const image = req.files.file;

  try {
    let uploadedImage;

    if (image) {
      uploadedImage = await uploadFile(image);
    }

    const data = {
      image: uploadedImage.Location ? uploadedImage.Location : '',
      name,
      content
    };

    const newTestimony = Testimonials.build(data);
    await newTestimony.save();

    res.status(200).json(newTestimony);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor'
    });
  };
};
