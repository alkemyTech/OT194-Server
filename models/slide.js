const { Model } = require('sequelize');
const organizationModel = require('./Organization');

module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  Slide.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      organizationId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Slide',
      paranoid: true
    }
  );

  const Organization = organizationModel(sequelize, DataTypes);

  Slide.Organization = Slide.belongsTo(Organization, {
    foreignKey: 'organizationId',
    as: 'Organization'
  });
  return Slide;
};
