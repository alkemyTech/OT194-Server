const db = require('../../database/models');
const user = db.User;
module.exports = async (req, res) => {
  try {
    await res.json(user.findAll());
    res.status(200);
    return res;
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
