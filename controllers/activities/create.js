const { Activity } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const { name, content } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;

  try {
    if (!image) {
      return res.status(400).json({
        message: 'Por favor envíe una imagen'
      });
    }

    const uploadedImage = await uploadFile(image);

    const data = {
      image: uploadedImage.Location ? uploadedImage.Location : '',
      name,
      content
    };

    const newActivity = Activity.build(data);
    await newActivity.save();

    res.status(201).json(newActivity);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  };
};
