const { describe } = require('mocha');
const publicData = require('./public');
const updateOrg = require('./updateOrg');

module.exports = () => {
  describe('/organizations/1/public route testing suite', publicData.bind(this));
  describe('/organizations/organization/:id route testing suite', updateOrg.bind(this));
};
