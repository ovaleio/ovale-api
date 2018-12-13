module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ExchangeVolumeRanking', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      exchangeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Exchanges',
          key: 'id',
          as: 'exchangeId',
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
    queryInterface.dropTable('ExchangeVolumeRanking'),
};