const bcryptjs = require('bcryptjs');
const User = require('../../database/models').User;
const generateToken = require('../../functions/generateToken');

module.exports = async (req, res) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    // Email ya esta registrado?
    const emailExists = await User.findOne({
      where: { email }
    });

    if (emailExists) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    };

    // Encriptamos password
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const userCreated = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image,
      roleId: 1
    });

    const createdUser = {
      id: userCreated.id,
      firstName,
      lastName,
      email,
      image,
      roleId: userCreated.roleId,
      token: generateToken(userCreated.id)
    };

    res.status(201).json(createdUser);
  } catch (error) {
    if (req.app.get('env') === 'development') console.log(error);

    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: {
      email: process.env.SENGRID_MAIL
    },
    subject: 'Gracias por registrarte con nosotros',
    text: 'Estamos muy felices porque nuestra familia se agranda ! Gracias por ser parte de nosotros',
    html: '<strong>Estamos muy felices porque nuestra familia se agranda !</strong><normal>! Gracias por ser parte de nosotros</normal>'
  };
  sgMail
    .send(msg)
    .then(() => {
    })
    .catch((error) => {
      if (req.app.get('env') === 'development') console.log('error', error.response);
      if (req.app.get('env') === 'development') console.log('body error', error?.response?.body?.errors);
    });
};
