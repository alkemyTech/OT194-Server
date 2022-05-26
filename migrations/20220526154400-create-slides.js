const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Slides', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false
        },  
        // image DataType STRING as it should be an url
        text: {
          type: Sequelize.STRING,
          allowNull: false
        },
        order: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        organizationId: {
            allowNull: false,
            type: Sequelize.INTEGER,
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Slides');
    }
  };
  