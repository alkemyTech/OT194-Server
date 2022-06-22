const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = require('chai').expect;
const should = require('chai').should();

chai.use(chaiHttp);

const userAdminMock = {
    'email': 'usuariouno@test.com',
    'password': '123456'
}

const userNotAdminMock = {
    'email': 'usuariodos@test.com',
    'password': '123456'
}

describe('Obtener todos los usuarios: ', () => {
    it('Deberia hacer login con usuario y obtener todos los usuario', (done) => {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(userAdminMock)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                should.exist(res.body.token);
                const token = res.body.token;
                
                chai.request(server)
                    .get('/api/v1/users')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array').to.not.be.empty;
                        done();
                    });
            });
    })

    it('Deberia hacer login con usuario No admin y obtener acceso denegado', (done) => {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(userNotAdminMock)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                should.exist(res.body.token);
                const token = res.body.token;

                chai.request(server)
                    .get('/api/v1/users')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function (err, res) {
                        console.log('======>>>>', res.body)
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Admin access denied');
                        done();
                    })
            })
    })
}) 
