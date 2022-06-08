module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Activities', {
      name: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Activities');
  }
};
