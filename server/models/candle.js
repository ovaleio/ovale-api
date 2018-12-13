module.exports = (sequelize, DataTypes) => {
  const Candle = sequelize.define('Candle', {
    marketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_open: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_close: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    open: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    high: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    low: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    close: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    volume: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
  }, {
    timestamps: false
  });
  Candle.associate = (models) => {
    Candle.belongsTo(models.Market, {
      foreignKey: 'marketId',
      as: 'market',
    });
  };
  return Candle;
};
