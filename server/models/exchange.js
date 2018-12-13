module.exports = (sequelize, DataTypes) => {
    const Exchange = sequelize.define('Exchange', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pairPattern: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    Exchange.associate = (models) => {
        Exchange.hasMany(models.ExchangeSymbol, {
            foreignKey: 'exchangeId',
            as: 'symbols',
        });

        Exchange.hasMany(models.Market, {
            foreignKey: 'exchangeId',
            as: 'markets',
        });
    };
    return Exchange;
};
