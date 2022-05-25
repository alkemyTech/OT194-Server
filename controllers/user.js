const bcryptjs = require('bcryptjs');
// const user = require('../models/user');
const User = require("../models").User;

const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		// Email ya esta registrado?
		const emailExists = await User.findOne({
			where: {
				email,
			},
		});

		if (emailExists) {
			return res.status(400).json({ msg: 'Email already registered' });
		}
		//Encriptamos password
		const salt = bcryptjs.genSaltSync();

		const hashedPassword = bcryptjs.hashSync(password, salt);

		const userCreated = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		return res.status(201).json({
			ok: true,
			User: {
				email: userCreated.email,
			},
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msg: error });
	}
};

module.exports = {
	register,
};
