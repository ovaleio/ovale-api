module.exports = (sequelize, DataTypes) => {
  const ExchangeSymbol = sequelize.define('ExchangeSymbol', {
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchangeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  ExchangeSymbol.associate = (models) => {
    ExchangeSymbol.belongsTo(models.Exchange, {
      foreignKey: 'exchangeId',
      onDelete: 'CASCADE',
    });

    //add link to currency?
  };
  return ExchangeSymbol;
};
