const chai = require('chai');
const chaiHttp = require('chai-http');
const { body } = require('express-validator');
const should = chai.should();

chai.use(chaiHttp);

describe('Contact GET - Test Endpoint', () => {
  const url = 'http://localhost:8080/api/v1';
  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjAwZWE2LWVkYmItNDkwMS04M2M3LWY2NTU2MGIxZDUwNSIsImlhdCI6MTY1NTg0Njk3NSwiZXhwIjoxNjU3MTQyOTc1fQ.QgcMOtFca0Ba6Mc_RxGe_4d4JwcqDTNwss106Mp8vTM';
  const adminToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjAwZWE2LWVkYmItNDkwMS04M2M3LWY2NTU2MGIxZDUwNSIsImlhdCI6MTY1NTg2MDY5NiwiZXhwIjoxNjU3MTU2Njk2fQ.WwN9qm04-MbizMYIIZNg_Jw8HRx8Q6GP7-yzFvF1SGA';

  it('Debera devolver 200 y la data cuando el token es valido', (done) => {
    chai
      .request(url)
      .get('/contacts')
      .auth(`${adminToken}`, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        if (res.body.length > 0) {
          res.body.forEach((contact) => {
            contact.should.have.property('id');
          });
        }
        done();
      });
  });

  it('Debera devolver 401 y no traer data cuando el token es invalido', (done) => {
    chai
      .request(url)
      .get('/contacts')
      .auth(`${userToken}`, { type: 'bearer' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have
          .property('message')
          .eql('Not authorized, invalid token');
        done();
      });
  });
});
