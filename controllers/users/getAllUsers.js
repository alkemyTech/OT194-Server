const { User } = require('../../database/models');

module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ['password'] }
    });

    res.status(200).json(users);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    return res.status(500).json({ message: 'Error del servidor, contacte al administrador' });
  }
};
