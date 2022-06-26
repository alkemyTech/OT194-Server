const { Entries } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const { name, content } = req.body;
  const type = 'news';
  const image = (req.files && req.files.file) ? req.files.file : null;

  try {
    if (!image) {
      return res.status(400).json({
        message: 'La imagen es requerida.'
      });
    }

    const uploadedImage = await uploadFile(image);
    const data = await Entries.create({
      name,
      content,
      image: uploadedImage.Location,
      categoryId: 2, // Las categorias no estan implementadas, debe corregirse el modelo de News.
      type
    });
    if (!data) {
      return res.status(404).json({
        message: 'Surgio un problema con el servidor, comuniquese con el Administrador '
      });
    };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
