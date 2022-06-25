const bcryptjs = require('bcryptjs');
const User = require('../../database/models').User;
const generateToken = require('../../functions/generateToken');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['deletedAt', 'createdAt', 'updatedAt']
      },
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
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

    delete user.dataValues.password;
    const loggedUser = {
      ...user.dataValues,
      token: generateToken(user.id)
    };

    res.status(200).json(loggedUser);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
