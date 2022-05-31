const express = require('express');
const { uploadFile } = require('../helpers/uploadFile');

const router = express.Router();
/* GET home page. */
router.post('/', (req, res, next) => {
  const file = req.files.foo;
  uploadFile(file);
  // res.send(req);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
