const { Member } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
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
    const memberById = await Member.findOne({
      where: { id }
    });

    if (!memberById) {
      return res.status(404).json({
        message: `No se encontró un miembro para el id ${id}`
      });
    };

    memberById.name = name;
    if (image && uploadedImage && uploadedImage.Location) {
      memberById.image = uploadedImage.Location;
    };

    await memberById.save();

    res.status(200).json(memberById);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
