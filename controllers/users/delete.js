const db = require('../../database/models');
const User = db.User;

module.exports = async (req, res) => {
  const id = req.user.id;
  try {
    await User.update(
      {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: '',
        deletedAt: Date.now()
      }, {
        where: { id }
      });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
  res.status(200).json({
    msg: 'User  deleted Sucessfully'
  });
};
