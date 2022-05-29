const bcryptjs = require('bcryptjs');
const db = require('../models');
const User = db.User;

const userController = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      // Email ya esta registrado?
      const emailExists = await User.findOne({
        where: {
          email
        }
      });

      if (emailExists) {
        return res.status(400).json({ msg: 'Email already registered' });
      }
      // Encriptamos password
      const salt = bcryptjs.genSaltSync();

      const hashedPassword = bcryptjs.hashSync(password, salt);

      const userCreated = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      return res.status(201).json({
        ok: true,
        user: {
          email: userCreated.email
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await User.destroy({
        where: { id }
      }, {
        force: true
      });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
    res.status(200).json({
      msg: `User ${id} deleted Sucessfully`
    });
  }
};

module.exports = userController;
