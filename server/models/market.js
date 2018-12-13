module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    tradingPair: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchangeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitCurrencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baseCurrencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Market.associate = (models) => {
    Market.belongsTo(models.Exchange, {
      foreignKey: 'exchangeId',
      as: 'exchange',
    });

    Market.belongsTo(models.Currency, { foreignKey: 'unitCurrencyId', as: 'unitCurrency' })
    Market.belongsTo(models.Currency, { foreignKey: 'baseCurrencyId', as: 'baseCurrency' })
  };
  return Market;
};
