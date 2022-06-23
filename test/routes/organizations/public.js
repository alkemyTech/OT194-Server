
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');
const server = require('../../../bin/www');
const { Organization } = require('../../../database/models');
const getRoute = '/api/v1/organizations/1/public';

chai.should();
chai.use(chaiHttp);
chai.use(dirtyChai);

chai.Assertion.addMethod('stringOrNull', function (prop) {
  if (typeof prop === 'string' || prop === null) return true;
  return false;
});

module.exports = () => {
  describe('GET public data success', () => {
    it('It should response with a 200 status code with the organization public data as JSON',
      async () => {
        const response = await chai.request(server).get(getRoute);

        response.should.have.status(200);
        response.body.should.be.an('object');
        response.body.should.have.property('name').that.is.an('string').that.is.ok();
        response.body.should.have.property('image').that.is.an('string').that.is.ok();
        response.body.should.have.property('phone').that.is.stringOrNull();
        response.body.should.have.property('address').that.is.stringOrNull();
        response.body.should.have.property('welcomeText').that.is.an('string').that.is.ok();
        response.body.should.have.property('facebook').that.is.stringOrNull();
        response.body.should.have.property('linkedin').that.is.stringOrNull();
        response.body.should.have.property('instagram').that.is.stringOrNull();
      });
  });

  describe('Empty table', () => {
    it('It should response with a 404 status with a message as JSON',
      async () => {
        if (process.env.NODE_ENV === 'test') {
          await Organization.destroy({
            where: { deletedAt: null }
          });
        }

        const response = await chai.request(server).get(getRoute);

        await Organization.restore({
          where: { id: 1 }
        });

        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('message')
          .that.is.an('string')
          .that.is.eql('No se encontró la información de la organización');
      });
  });
};
