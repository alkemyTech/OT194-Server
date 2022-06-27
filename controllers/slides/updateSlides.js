const { Slide } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const id = req.params.id;
  const { text, order, newsId } = req.body;
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
    const slide = await Slide.findOne({
      where: { id }
    });

    if (!slide) {
      return res.status(404).json({
        message: `No se encontró un testimonio para el id ${id}`
      });
    };

    slide.text = text;
    if (image && uploadedImage && uploadedImage.Location) {
      slide.imageUrl = uploadedImage.Location;
    };
    slide.order = order;
    slide.newsId = newsId;

    await slide.save();

    res.status(200).json(slide);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
