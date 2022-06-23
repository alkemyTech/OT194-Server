const { describe } = require('mocha');
const organizations = require('./organizations/organizations');

module.exports = () => {
  describe('/organizations routes testing suite', organizations.bind(this));
};
