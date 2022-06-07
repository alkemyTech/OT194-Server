const bcryptjs = require('bcryptjs');
const { User, Role } = require('../../database/models');
const generateToken = require('../../functions/generateToken');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      include: [
        {
          model: Role,
          as: 'role'
        }
      ],
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'No hay un usuario registrado con ese email'
      });
    };

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        ok: false,
        message: 'Contraseña incorrecta'
      });
    };

    const loggedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      role: {
        id: user.role.id,
        name: user.role.name
      },
      token: generateToken(user.userUUID)
    };

    res.status(200).json(loggedUser);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
