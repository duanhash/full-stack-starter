import { Model, Op } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stock.init({
    Ticker: DataTypes.STRING,
    Company: DataTypes.STRING,
    Founded: DataTypes.STRING,
    About: DataTypes.TEXT,
    Industry: DataTypes.STRING,
    Images: DataTypes.STRING,
    ImagesUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.assetUrl('Images');
      }
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });

  Stock.afterSave(async (record, options) => {
    record.handleAssetFile('Images', options);
  });

  return Stock;
};