const { describe } = require('mocha');
const mailer = require('./mailer');

module.exports = () => {
  describe('Mailer testing suite', mailer.bind(this));
};
