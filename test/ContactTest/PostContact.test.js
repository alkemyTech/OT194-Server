const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { name } = require('ejs');
const should = chai.should();

chai.use(chaiHttp);

describe('Contact POST - Test Endpoint', () => {
  const url = 'http://localhost:8080/api/v1';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjAwZWE2LWVkYmItNDkwMS04M2M3LWY2NTU2MGIxZDUwNSIsImlhdCI6MTY1NTg0Njk3NSwiZXhwIjoxNjU3MTQyOTc1fQ.QgcMOtFca0Ba6Mc_RxGe_4d4JwcqDTNwss106Mp8vTM';
  const body = {
    name: 'Prueba',
    phone: null,
    email: 'fbussons3@live.com',
    message:
      'platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in',
  };

  it('Debera devolver un 200 y crear un contacto', (done) => {
    chai
      .request(url)
      .post('/contacts')
      .auth(`${token}`, { type: 'bearer' })
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('id');
        res.body.id.should.be.a('number');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        done();
      });
  });

  it('Debera devolver 400 y no crear un contacto con datos vacios/incorrectos', (done) => {
    body.email = null;
    body.name = null;
    chai
      .request(url)
      .post('/contacts')
      .auth(`${token}`, { type: 'bearer' })
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.forEach((error) => {
          if (error.param == 'email') {
            expect(error.msg).to.be.oneOf([
              'Por favor ingrese un email',
              'Por favor ingrese un email válido',
            ]);
          }
          if (error.param == 'name') {
            error.should.have
              .property('msg')
              .eql('Por favor ingrese su nombre');
          }
        });
        done();
      });
  });
});
