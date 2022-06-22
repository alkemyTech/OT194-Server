const apiRouter = require('./routes/apiRouter');

const { describe } = require('mocha');

describe('App server testing', function () {
  describe('Routes testing suite', apiRouter.bind(this));
});
