const nodemailer = require('nodemailer');

module.exports = {
  async emailService(username, email) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      let info = await transporter.sendMail({
        from: '<somosfundacionmas.mensajeria@gmail.com>',
        to: email,
        subject: 'Gracias por registrarte a Somos Mas(ONG)',
        html: `<h2>Hola ${username},</h2>
        <p>Te has registrado a Somos Mas (ONG). Si no has sido tu, comunicate con nuestro team de soporte</p>`,
      });
      return 'Message sent: %s', info.messageId;
    } catch (err) {
      return err;
    }
  },
};
