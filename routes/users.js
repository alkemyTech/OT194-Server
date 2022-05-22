const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/auth/register', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const salt = bcryptjs.genSaltSync();

	const hashedPassword = bcryptjs.hashSync(password, salt);
});

module.exports = router;
