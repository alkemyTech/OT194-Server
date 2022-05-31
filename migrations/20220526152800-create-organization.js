module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organization', {
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
      // image DataType STRING as it should be an url
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: Sequelize.STRING,
      address: Sequelize.STRING,
      welcomeText: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Organization');
  }
};
