const { Contacts } = require('../../database/models');

module.exports = async (req, res) => {
  try {
    const contactsDB = await Contacts.findAll({});

    if (contactsDB.length < 1) {
      return res.status(404).json({
        message: 'No se encontraron contactos'
      });
    };

    res.status(200).json(contactsDB);
  } catch (error) {
    res.status(500).json({
      message: 'Error del servidor, contacte al administrador'
    });
  }
};
