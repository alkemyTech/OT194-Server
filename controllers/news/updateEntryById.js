const { Entries } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const entryId = req.params.id;
  const { name, content } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;

  try {
    const entryDb = await Entries.findByPk(entryId);

    if (!entryDb) {
      return res.status(404).json({
        message: `No se encontró una novedad con el ID ${entryId}`
      });
    }

    if (!image) {
      return res.status(400).json({
        message: 'Por favor, complete todos los datos requeridos.'
      });
    }

    const uploadedImage = await uploadFile(image);

    const data = {
      name,
      content,
      image: uploadedImage.Location
    };

    await entryDb.update(data);
    res.status(200).json(entryDb);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor'
    });
  }
};
