const db = require('../../database/models');
const User = db.User;
module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
    return res;
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor, contacte al administrador' });
  }
};
