const { Contacts } = require('../../database/models');

module.exports = async (req, res) => {
  const { name, email, message, phone } = req.body;

  try {
    const newContact = await Contacts.create({
      name,
      phone,
      email,
      message
    });
    console.log(newContact);
    res.status(200).json(newContact);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor'
    });
  }
};
