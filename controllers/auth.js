// const bcryptjs = require('bcryptjs');
// const User = require('../models').User;
// const generateToken = require('../functions/generateToken');
// const { fileUpload } = require('../helpers/fileUpload');

const login = async (req, res) => {
  // const { file } = req.body;

  console.log(req.body);
  // fileUpload(file);

  // try {
  //   const user = await User.findOne({
  //     where: {
  //       email
  //     }
  //   });

  //   if (!user) {
  //     return res.status(400).json({
  //       ok: false
  //     });
  //   };

  //   const isPasswordValid = bcryptjs.compareSync(password, user.password);
  //   if (!isPasswordValid) {
  //     return res.status(401).json({
  //       ok: false
  //     });
  //   };

  //   const loggedUser = {
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     image: user.image,
  //     roleId: user.roleId,
  //     token: generateToken(user.userUuid)
  //   };

  //   res.status(200).json(loggedUser);
  // } catch (error) {
  //   if (req.app.get('env') === 'development') console.log(error);

  //   res.status(500).json({
  //     message: 'Contacta al administrador'
  //   });
  // }
};

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */

const getUser = async (req, res) => {
  const { firstName, lastName, email, image, roleId } = req.user;
  const userData = {
    firstName,
    lastName,
    email,
    image,
    roleId
  };

  res.status(200).json(userData);
};

module.exports = {
  login,
  getUser
};
