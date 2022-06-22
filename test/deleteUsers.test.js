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

describe('Eliminar usuario: ', () => {
    it('Deberia hacer login y eliminar un usuario', (done) => {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(userAdminMock)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                should.exist(res.body.token);
                const token = res.body.token;

                chai.request(server)
                    .put('/api/v1/users/5e89368e-8d19-43d2-a4f0-e5658eb56180')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.msg).to.equal('User 5e89368e-8d19-43d2-a4f0-e5658eb56180 deleted Sucessfully');
                        done();
                    })
            })
    })

    it.only('Deberia hacer login y obtener acceso denegado', (done) => {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(userNotAdminMock)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                should.exist(res.body.token);
                const token = res.body.token;

                chai.request(server)
                    .put('/api/v1/users/5e89368e-8d19-43d2-a4f0-e5658eb56180')
                    .set('Authorization', 'Bearer ' + token)
                    .end(function (err, res) {
                        console.log('=====>', res.body)
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Admin access denied');
                        done();
                    })
            })
    })
}) 
