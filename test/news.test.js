const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('News - Endpoint tests', function () {
  let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjAwZWE2LWVkYmItNDkwMS04M2M3LWY2NTU2MGIxZDUwNSIsImlhdCI6MTY1NTg0Njk3NSwiZXhwIjoxNjU3MTQyOTc1fQ.QgcMOtFca0Ba6Mc_RxGe_4d4JwcqDTNwss106Mp8vTM";
  let userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1ZWQyNzE1LTFhNmUtNDc0My1hYmJhLTYwNmU1ZWY4M2RkZSIsImlhdCI6MTY1NTkxNjQ5OCwiZXhwIjoxNjU3MjEyNDk4fQ.Zxyt5A83B_o8NmlBJ6eM_qDmmR0QtlujKASSUg92NS0";
  const url = 'http://localhost:8080/api/v1';
  const body = {
    name: "NoticiaTest1",
    content: "Cupidatat labore incididunt cupidatat ea reprehenderit irure ullamco. Anim qui amet consectetur cillum cupidatat. Dolore laboris dolore anim ut cillum commodo laborum cupidatat. Incididunt pariatur in sunt Lorem laborum est qui nostrud laboris labore mollit et id. Labore voluptate anim deserunt dolor est excepteur ullamco veniam. Labore fugiat amet excepteur elit excepteur nisi laboris aliqua qui esse duis. Irure aute pariatur incididunt sunt anim non ex non labore officia quis minim. Et irure exercitation qui esse do mollit sit quis nostrud. Aliqua sit dolore qui ex velit nulla minim amet. Ullamco adipisicing fugiat sit eu labore voluptate nostrud amet mollit amet ullamco ea occaecat. Veniam aute nisi est pariatur aute labore reprehenderit adipisicing esse irure consequat.",
  }
  let newsId;

  before( function () {
    // Crea una novedad la cual se usara para modificar y eliminar
    chai.request(url)
      .post('/news')
      .type('form')
      .auth(`${adminToken}`, { type: 'bearer' })
      .attach('file', './test/news.jpeg', 'news.jpeg')
      .field('name', body.name)
      .field('content', body.content)
      .end( function (err, res) {
        newsId = res.body.id
      })
  });
  
  describe('Creacion', function () {
    it('deberia crear y retornar datos correctamente (201 Created)', function (done) {
      chai.request(url)
      .post('/news')
      .type('form')
      .auth(`${adminToken}`, { type: 'bearer' })
      .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
        .attach('file', './test/news.jpeg', 'news.jpeg')
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
