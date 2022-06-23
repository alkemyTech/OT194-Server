const { Organization } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, phone, address, welcomeText, facebook, linkedin, instagram } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;

  if (!image) {
    return res.status(400).json({ message: 'Por favor envíe una imagen' });
  }

  try {
    const uploadedImage = await uploadFile(image);

    const orgById = await Organization.findOne({
      where: { id }
    });

    if (!orgById) {
      return res.status(404).json({
        message: `No se encontró una organización para el id ${id}`
      });
    }

    orgById.name = name;
    orgById.image = uploadedImage.Location;
    orgById.phone = phone || null;
    orgById.address = address || null;
    orgById.welcomeText = welcomeText;
    orgById.facebook = facebook || null;
    orgById.linkedin = linkedin || null;
    orgById.instagram = instagram || null;
    await orgById.save();

    res.status(200).json(orgById);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
