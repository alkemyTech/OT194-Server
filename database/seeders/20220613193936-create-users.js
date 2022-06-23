const { v4: UUIDV4 } = require('uuid');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
const hashedPassword = bcrypt.hashSync('123456', salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Uno',
        email: 'usuariouno@test.com',
        password: hashedPassword,
        roleId: 2,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Dos',
        email: 'usuariodos@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Tres',
        email: 'usuariotres@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Cuatro',
        email: 'usuariocuatro@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Cinco',
        email: 'usuariocinco@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Seis',
        email: 'usuarioseis@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Siete',
        email: 'usuariosiete@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Ocho',
        email: 'usuarioocho@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Nueve',
        email: 'usuarionueve@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: UUIDV4(),
        firstName: 'Usuario',
        lastName: 'Diez',
        email: 'usuariodiez@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
