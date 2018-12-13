module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CurrencyMetric', {
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
      currency_volume: {
        allowNull: false,
        type: Sequelize.FLOAT,
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('CurrencyMetric'),
};