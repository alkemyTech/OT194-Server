const fs = require('fs');
const path = require('path');
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');
const server = require('../../../bin/www');
const getRoute = '/api/v1/organizations/1/public';
const putRoute = '/api/v1/organizations/organization/1';
const updateName = 'Somos más modificado';
const updatePhone = '+54 9 1234 5678';
const updateAddress = 'Dirección modificada';
const updateWelcomeText = 'Texto de bienvenida modificado';
const updateFacebook = 'Facebook modificado';
const updateLinkedin = 'Linkedin modificaco';
const updateInstagram = 'Instagram modificado';
const filePath = path.join(__dirname, 'login-hands.png');

chai.should();
chai.use(chaiHttp);
chai.use(dirtyChai);

chai.Assertion.addMethod('stringOrNull', function (prop) {
  if (typeof prop === 'string' || prop === null) return true;
  return false;
});

module.exports = () => {
  describe('UPDATE public data success', () => {
    it('It should response with a 200 status code with the new organization public data as JSON',
      async () => {
        const response = await chai.request(server)
          .put(putRoute)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('name', updateName)
          .field('welcomeText', updateWelcomeText)
          .attach('file', fs.readFileSync(filePath));

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

  describe('UPDATE public data success check', () => {
    it('It should update data at database',
      async () => {
        await chai.request(server)
          .put(putRoute)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('name', updateName)
          .field('phone', updatePhone)
          .field('address', updateAddress)
          .field('welcomeText', updateWelcomeText)
          .field('facebook', updateFacebook)
          .field('linkedin', updateLinkedin)
          .field('instagram', updateInstagram)
          .attach('file', fs.readFileSync(filePath));

        const response = await chai.request(server).get(getRoute);

        response.should.have.status(200);
        response.body.should.be.an('object');
        response.body.should.have.property('name').that.is.eql(updateName);
        response.body.should.have.property('image')
          .that.is.a('string')
          .that.includes(`https://${process.env.AWS_BUCKET_NAME}.s3.`);
        response.body.should.have.property('phone').that.is.eql(updatePhone);
        response.body.should.have.property('address').that.is.eql(updateAddress);
        response.body.should.have.property('welcomeText').that.is.eql(updateWelcomeText);
        response.body.should.have.property('facebook').that.is.eql(updateFacebook);
        response.body.should.have.property('linkedin').that.is.eql(updateLinkedin);
        response.body.should.have.property('instagram').that.is.eql(updateInstagram);
      });
  });

  describe('Missing name field at request', () => {
    it('It should response with a 400 status code with a message as JSON',
      async () => {
        const response = await chai.request(server)
          .put(putRoute)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('welcomeText', updateWelcomeText)
          .attach('file', fs.readFileSync(filePath));

        response.should.have.status(400);
        response.body.should.be.an('object');
        response.body.should.have.property('message')
          .that.is.an('string')
          .that.is.eql('Por favor ingrese un nombre');
      });
  });

  describe('Missing welcomeText field at request', () => {
    it('It should response with a 400 status code with a message as JSON',
      async () => {
        const response = await chai.request(server)
          .put(putRoute)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('name', updateName)
          .attach('file', fs.readFileSync(filePath));

        response.should.have.status(400);
        response.body.should.be.an('object');
        response.body.should.have.property('message')
          .that.is.an('string')
          .that.is.eql('Por favor ingrese el texto de bienvenida');
      });
  });

  describe('Missing image file attached to request', () => {
    it('It should response with a 400 status code with a message as JSON',
      async () => {
        const response = await chai.request(server)
          .put(putRoute)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('name', updateName)
          .field('welcomeText', updateWelcomeText);

        response.should.have.status(400);
        response.body.should.be.an('object');
        response.body.should.have.property('message')
          .that.is.an('string')
          .that.is.eql('Por favor envíe una imagen');
      });
  });

  describe('Welcome text is too long', () => {
    it('It should response with a 400 status code with a message as JSON',
      async () => {
        const response = await chai.request(server)
          .put(putRoute)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('name', updateName)
          .field('welcomeText', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vesti')
          .attach('file', fs.readFileSync(filePath));

        response.should.have.status(400);
        response.body.should.be.an('object');
        response.body.should.have.property('message')
          .that.is.an('string')
          .that.is.eql('El texto de bienvenida puede tener un máximo de 2500 caracteres');
      });
  });

  describe('There is no organization for the id sent', () => {
    it('It should response with a 404 status code with a message as JSON',
      async () => {
        const response = await chai.request(server)
          .put(`${putRoute}23456`)
          .set({ Authorization: `Bearer ${process.env.USER_AUTH_TOKEN}` })
          .field('name', updateName)
          .field('welcomeText', updateWelcomeText)
          .attach('file', fs.readFileSync(filePath));

        response.should.have.status(404);
        response.body.should.be.an('object');
        response.body.should.have.property('message')
          .that.is.an('string')
          .that.is.eql('No se encontró una organización para el id 123456');
      });
  });
};
