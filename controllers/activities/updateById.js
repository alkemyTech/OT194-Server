const { Activities } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  /*
    Falta manejar correctamente la obtencion de la imagen de actividad,
  */
  const { id } = req.params;
  const { name, content } = req.body;
  const image = req.files.file;
  let uploadedImage;

  try {
    const activityDB = await Activities.findByPk(id);

    if (!activityDB) {
      res.status(404).json('La actividad solicitada no fue encontrada');
    }

    if (image) {
      uploadedImage = await uploadFile(image);
    }

    const data = {
      image: uploadedImage.Location ? uploadedImage.Location : '',
      name,
      content
    };

    await activityDB.update(data);

    console.log('update activity', activityDB);
    res.status(200).json(activityDB);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error del servidor'
    });
  };
};
