const { Activities } = require('../../database/models');
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

    const newActivity = Activities.build(data);
    await newActivity.save();

    console.log('create activity', newActivity);
    res.json(newActivity);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error del servidor'
    });
  };
};
