'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // Did not erase because it may need an association at histories 78 and 79
    // static associate(models) {
    //  // define association here
    // }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // image DataType STRING as it should be an url
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    welcomeText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Organization',
    paranoid: true
  });
  return Organization;
};
