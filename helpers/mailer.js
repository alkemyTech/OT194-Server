const sgMail = require('@sendgrid/mail');
const validateEmail = require('./validateEmail');

module.exports = async (to, subject, text, html) => {
  if (!to || !subject || !text || !html) {
    const missingArgs = 'Params to send mail missing';
    if (process.env.NODE_ENV === 'development') console.log(missingArgs);
    throw new Error(missingArgs);
  };

  if (!validateEmail(to)) throw new Error('Invalid email address for param "to"');

  try {
    const msg = {
      to,
      from: { email: process.env.SENDGRID_MAIL },
      subject,
      text,
      html
    };
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send(msg);

    return 'Email sent successfully';
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.log(error);

    throw new Error('There was an error sending the email');
  };
};
