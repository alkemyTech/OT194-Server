module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: Sequelize.STRING,
      address: Sequelize.STRING,
      welcomeText: {
        type: Sequelize.STRING(2500),
        allowNull: false
      },
      facebook: Sequelize.STRING,
      linkedin: Sequelize.STRING,
      instagram: Sequelize.STRING,
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Organizations');
  }
};
