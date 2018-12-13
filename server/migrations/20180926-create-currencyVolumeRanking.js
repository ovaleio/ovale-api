module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('CurrencyVolumeRanking', {
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
      ranking: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('CurrencyVolumeRanking'),
};