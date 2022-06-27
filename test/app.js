const apiRouter = require('./routes/apiRouter');
const helpers = require('./helpers');

const { describe } = require('mocha');

describe('App server testing', function () {
  describe('Routes testing suite', apiRouter.bind(this));
  describe('Helpers testing suite', helpers.bind(this));
});
