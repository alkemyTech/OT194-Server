module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        id: 2,
        name: 'Admin',
        description: 'Usuario administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1,
        name: 'Standard',
        description: 'Usuario regular',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
