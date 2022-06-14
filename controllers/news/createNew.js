const { Entries } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const { name, content, categoryId, deletedAt } = req.body;
  const type = 'news';
  const image = (req.files && req.files.file) ? req.files.file : null;

  try {
    if (!image) {
      return res.status(404).json({
        message: 'Por favor, ingrese una imagen'
      });
    }
    const uploadedImage = await uploadFile(image);
    const newCreated = await Entries.create({
      name,
      content,
      image: uploadedImage.Location,
      categoryId,
      deletedAt,
      type
    });
    if (!newCreated) {
      return res.status(404).json({
        message: 'Surgio un problema con el servidor, comuniquese con el Administrador '
      });
    };
    res.status(200).json(newCreated);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
