const { Activity } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const id = req.params.id;
  const { name, content } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;

  try {
    if (!image) {
      return res.status(400).json({
        message: 'Por favor envíe una imagen'
      });
    }

    const uploadedImage = await uploadFile(image);

    const activityById = await Activity.findOne({
      where: { id }
    });

    if (!activityById) {
      return res.status(404).json({
        message: `No se encontró un testimonio para el id ${id}`
      });
    };

    activityById.name = name;
    if (uploadedImage?.Location) {
      activityById.image = uploadedImage.Location;
    };
    activityById.content = content;

    await activityById.save();

    res.status(200).json(activityById);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
