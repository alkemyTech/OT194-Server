// const bcryptjs = require('bcryptjs');
// const { generateJWT } = require("../helpers/generate-jwt");
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
        // msg: 'The email entered does not belong to a user'
        ok: false
      })
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            // msg: 'Password is incorrect'
            ok: false
        })
    }
    
    // const token = await generateJWT(user.id, user.name);
  
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
      msg: 'Contact the administrator'
    }) 
  }

}

module.exports = {
  login
}