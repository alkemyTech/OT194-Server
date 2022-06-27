const { User } = require('../../database/models');
const { uploadFile } = require('../../helpers/uploadFile');
const generateToken = require('../../functions/generateToken');

module.exports = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, roleId } = req.body;
  const image = (req.files && req.files.file) ? req.files.file : null;
  let uploadedImage;

  if (req.user.id !== id && req.user.roleId !== 2) {
    return res.status(401).json({ message: 'No tiene permisos para modificar a ese usuario' });
  }

  if (image) {
    try {
      uploadedImage = await uploadFile(image);
    } catch (error) {
      if (req.app.get('env') === 'development') console.log(error);
    }
  }

  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt']
      },
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'No hay un usuario con ese id'
      });
    };

    user.firstName = firstName;
    user.lastName = lastName;

    if (image && uploadedImage && uploadedImage.Location) {
      user.image = uploadedImage.Location;
    };
    if (req.user.roleId === 2 && roleId) user.roleId = roleId;
    await user.save();

    const userDataUpdated = {
      ...user.dataValues,
      token: generateToken(user.id)
    };

    res.status(200).json(userDataUpdated);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error del servidor, contacte al administrador' });
  }
};
