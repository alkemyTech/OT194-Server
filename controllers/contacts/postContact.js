const Contacts = require('../../models').Contacts;
module.exports = async (req, res) => {
	try {
		const contact = await Contacts.create({ ...req.body });

		return res.status(201).json(contact);
	} catch (error) {
		return res.status(500).json({
			message: 'Error del servidor, contacte al administrador',
			error,
		});
	}
};
