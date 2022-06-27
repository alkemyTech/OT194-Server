const { Slide } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const newsId = req.params.newsId;
  const { text, order } = req.body;
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
    const data = {
      imageUrl: (uploadedImage && uploadedImage.Location) ? uploadedImage.Location : null,
      text,
      order,
      newsId
    };
    const newSlide = Slide.build(data);
    await newSlide.save();

    res.status(201).json(newSlide);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  };
};
