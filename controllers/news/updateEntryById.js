const { Entries } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const entryId = req.params.id;
  const { name, content, image: imageBdy } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;

  try {
    const entryDb = await Entries.findByPk(entryId);

    if (!entryDb) {
      return res.status(404).json({
        message: 'No se encontró una novedad con el ID enviado'
      });
    }

    if (!imageBdy && !image) {
      return res.status(400).json({
        message: 'Por favor envíe una imagen'
      });
    }

    let uploadedImage;
    if (image) {
      uploadedImage = await uploadFile(image);
    }

    const data = {
      name,
      content,
      image: uploadedImage?.Location ? uploadedImage?.Location : imageBdy
    };

    await entryDb.update(data);
    res.status(200).json(entryDb);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
