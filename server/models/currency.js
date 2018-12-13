module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'coin'
    },
    hexColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Currency.associate = (models) => {
    Currency.hasMany(models.ExchangeSymbol, {
      foreignKey: 'currencyId',
      as: 'exchangeSymbols',
    });
  };
  return Currency;
};
