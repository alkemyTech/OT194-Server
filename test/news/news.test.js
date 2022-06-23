const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('News - Endpoint tests', function () {
  const adminData = {
    email: 'admindemo@test.com',
    password: '123456'
  }
  const userData = {
    email: 'usuariodemo@test.com',
    password: '123456'
  }

  const url = 'http://localhost:8080/api/v1';
  const body = {
    name: "NoticiaTest1",
    content: "Cupidatat labore incididunt cupidatat ea reprehenderit irure ullamco.",
  }

  let adminToken;
  let userToken;
  let newsId;

  // Preparacion necesaria para el test
  before( async () => {
    // Inicia sesion de administrador y guarda el token
    await chai.request(url)
      .post('/auth/login')
      .send(adminData)
      .then(function (result) {
          adminToken = result.body.token;
        })


    // Inicia sesion de usuario y guarda el token
    await chai.request(url)
      .post('/auth/login')
      .send(userData)
      .then(function (result) {
        userToken = result.body.token;
      })

    // Crea una novedad la cual se usara para modificar y eliminar
    await chai.request(url)
      .post('/news')
      .type('form')
      .auth(`${adminToken}`, { type: 'bearer' })
      .attach('file', './test/news/news.jpeg', 'news.jpeg')
      .field('name', body.name)
      .field('content', body.content)
      .then( function (result) {
        newsId = result.body.id
      })
  });
  
  describe('Creacion', function () {
    it('deberia crear y retornar datos correctamente (201 Created)', function (done) {
      chai.request(url)
      .post('/news')
      .type('form')
      .auth(`${adminToken}`, { type: 'bearer' })
      .attach('file', './test/news/news.jpeg', 'news.jpeg')
      .field('name', body.name)
      .field('content', body.content)
      .end( function (err, res) {
        expect(res, 'Status incorrecto').to.have.status(201)
        expect(res.body, 'No hay body').is.not.undefined
        expect(res.body.id, 'No tiene un valor mayor a 0').is.above(0)
        expect(res.body.name, 'No existe nombre').is.string
        expect(res.body.content, 'No existe contenido').is.string
        done()
      })
    })
      
    it('deberia retornar error al no cargar una imagen (400 Bad Request)', function (done) {
      chai.request(url)
        .post('/news')
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .field('name', body.name)
        .field('content', body.content)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(400)
          done()
        })
    })

    it('deberia retornar error al no enviar name (400 Bad Request)', function (done) {
      chai.request(url)
        .post('/news')
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('content', body.content)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(400)
          done()
        })
    })

    it('deberia retornar error al no enviar contenido (400 Bad Request)', function (done) {
      chai.request(url)
        .post('/news')
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('name', body.name)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(400)
          done()
        })
    })

    it('deberia de rechazarme por no tener token (401 Unauthorized)', function (done) {
      chai.request(url)
        .post('/news')
        .type('form')
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('name', body.name)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(401)
          done()
        })
    })

    it('deberia de rechazarme por no ser administrador (403 Forbidden)', function (done) {
      chai.request(url)
        .post('/news')
        .type('form')
        .auth(`${userToken}`, { type: 'bearer' })
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('name', body.name)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(403)
          done()
        })
    })
  })

  describe('Obtencion', function () {
    it('deberia traer datos correctamente (200 Ok)', function (done) {
      chai.request(url)
        .get('/news')
        .auth(`${adminToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(200)
          expect(res.body, 'No hay body').is.not.undefined
          expect(res.body.length, 'El body no tiene objetos').is.above(0)
          expect(res.body[0].id, 'No tiene un valor mayor a 0').is.above(0)
          expect(res.body[0].name, 'No existe nombre').is.string
          expect(res.body[0].content, 'No existe contenido').is.string
          done()
        })
    })
  })

  describe('Obtencion por ID', function () {
    it('deberia traer datos por ID correctamente (200 Ok)', function (done) {
      chai.request(url)
        .get(`/news/${newsId}`)
        .auth(`${adminToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(200)
          expect(res.body, 'No hay body').is.not.undefined
          expect(res.body.id, 'No tiene un valor mayor a 0').is.above(0)
          expect(res.body.name, 'No existe nombre').is.string
          expect(res.body.content, 'No existe contenido').is.string
          done()
        })
    })

    it('deberia dar error por ID incorrecto (404 Not Found)', function (done) {
      chai.request(url)
        .get(`/news/${newsId}588899994444`)
        .auth(`${adminToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(404)
          done()
        })
    })
  })

  describe('Modificacion', function () {
    const body = {
      name: 'NoticiaTestModify',
      content: 'Poco contenido'
    }

    it('deberia modificar y retornar datos correctamente (200 Ok)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}`)
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('name', body.name)
        .field('content', body.content)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(200)
          expect(res.body, 'No hay body').is.not.undefined
          expect(res.body.id, 'No tiene un valor mayor a 0').is.above(0)
          expect(res.body.name, 'El nombre no se actualizo').is.equal(body.name)
          expect(res.body.content, 'El contenido no se actualizo').is.equal(body.content)
          done()
        })
    })

    it('deberia retornar error al no cargar una imagen (400 Bad Request)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}`)
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .field('name', 'NoticiaTestModifyWOImg',)
        .field('content', 'Poco contenido, sin imagen')
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(400)
          done()
        })
    })

    it('deberia retornar error al no enviar name (400 Bad Request)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}`)
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('content', body.content)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(400)
          done()
        })
    })

    it('deberia retornar error al no enviar contenido (400 Bad Request)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}`)
        .type('form')
        .auth(`${adminToken}`, { type: 'bearer' })
        .attach('file', './test/news/news.jpeg', 'news.jpeg')
        .field('name', body.name)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(400)
          done()
        })
    })

    it('deberia dar error por ID incorrecto (404 Not found)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}988899994444`)
        .auth(`${adminToken}`, { type: 'bearer' })
        .field('name', body.name)
        .field('content', body.content)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(404)
          done()
        })
    })

    it('deberia de rechazarme por no tener token (401 Unauthorized)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}`)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(401)
          done()
        })
    })

    it('deberia de rechazarme por no ser administrador (403 Forbidden)', function (done) {
      chai.request(url)
        .put(`/news/${newsId}`)
        .auth(`${userToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(403)
          done()
        })
    })
  })

  describe('Eliminacion', function () {
    it('deberia dar error por ID incorrecto (404 Not found)', function (done) {
      chai.request(url)
        .delete(`/news/${newsId}588899994444`)
        .auth(`${adminToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(404)
          done()
        })
    })

    it('deberia de rechazarme por no tener token (401 Unauthorized)', function (done) {
        chai.request(url)
        .delete(`/news/${newsId}`)
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(401)
          done()
        })
    })

    it('deberia de rechazarme por no ser administrador (403 Forbidden)', function (done) {
      chai.request(url)
        .delete(`/news/${newsId}`)
        .auth(`${userToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(403)
          done()
        })
    })

    it('deberia eliminar correctamente (200 Ok)', function (done) {
      chai.request(url)
        .delete(`/news/${newsId}`)
        .auth(`${adminToken}`, { type: 'bearer' })
        .end( function (err, res) {
          expect(res, 'Status incorrecto').to.have.status(200)
          done()
        })
    })
  })

});
