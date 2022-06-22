const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should()

chai.use(chaiHttp)

describe('Contact - Test Endpoint', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjAwZWE2LWVkYmItNDkwMS04M2M3LWY2NTU2MGIxZDUwNSIsImlhdCI6MTY1NTg2MDY5NiwiZXhwIjoxNjU3MTU2Njk2fQ.WwN9qm04-MbizMYIIZNg_Jw8HRx8Q6GP7-yzFvF1SGA';
  const url = 'http://localhost:8080/api/v1';
  const body = {
    name: 'Prueba',
    phone: 8155990887,
    email: 'fbussons3@live.com',
    message: 'platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in'
  };

  describe('/POST contacts', () => {
    it('no deberia crear un contact con datos incorrectos', (done) => {
        chai.request(url)
        .post('/contacts')
        .auth(`${token}`, { type: 'bearer' })
        .send(body)
        .end((err, res) => {
            expect(res, 'No retorno status 200').to.have.status(200);
            res.body.should.have.property('id');
            res.body.id.should.be.a('number');
            res.body.should.have.property('name');
            res.body.name.should.be.a('string');
            res.body.should.have.property('email');
            res.body.email.should.be.a('string');
            done()
        });
    });
  });

  describe('/GET contacts (all)', ()=>{
    it('deberia traer todos los contacts', (done)=>{
        chai.request(url)
        .get('/contacts')
        .auth(`${token}`, { type: 'bearer' })
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
        })
        done()
    })
  })
});
