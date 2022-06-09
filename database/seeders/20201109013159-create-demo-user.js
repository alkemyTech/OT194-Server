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
        lastName: 'Demo',
        email: 'usuariodemo@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: UUIDV4(),
        firstName: 'Admin',
        lastName: 'Demo',
        email: 'admindemo@test.com',
        password: hashedPassword,
        roleId: 1,
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
