const bcryptjs = require('bcryptjs');
const User = require('../../models').User;
const generateToken = require('../../functions/generateToken');

module.exports = async (req, res) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    // Email ya esta registrado?
    const emailExists = await User.findOne({
      where: {
        email
      }
    });

    if (emailExists) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    };

    // Encriptamos password
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const userCreated = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image,
      roleId: 1
    });

    const createdUser = {
      firstName,
      lastName,
      email,
      image,
      roleId: userCreated.roleId,
      token: generateToken(userCreated.user_uuid)
    };

    res.status(201).json(createdUser);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
