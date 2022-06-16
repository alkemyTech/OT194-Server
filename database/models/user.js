const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.belongsTo(models.Role, { as: 'role' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      image: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
