const bcryptjs = require('bcryptjs');
const db = require("../models");

const login = async(req, res) => {
  const {email, password}  = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        email
      }
    })
    
    if (!user) {
      return res.status(400).json({
        ok: false
      })
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false
      })
    }
    
    const loggedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      roleId: user.roleId,
    }
    res.status(200).json(loggedUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contacta al administrador'
    }) 
  }

}

module.exports = {
  login
}