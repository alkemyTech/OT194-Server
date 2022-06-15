'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Slide.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'Organization'
      });
      Slide.belongsTo(models.Entries, {
        foreignKey: 'newsId'
      });
    }
  };
  Slide.init({
    imageUrl: DataTypes.STRING,
    text: DataTypes.STRING,
    order: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
    newsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slide'
  });
  return Slide;
};
