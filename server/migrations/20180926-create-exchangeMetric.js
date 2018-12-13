module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ExchangeMetric', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Currencies',
          key: 'id',
          as: 'currencyId',
        },
      },
      time_open: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      time_close: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      exchange_volume_usd: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      exchange_volume_btc: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('ExchangeMetric'),
};