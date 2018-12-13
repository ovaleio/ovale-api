module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Candle', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      marketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Markets',
          key: 'id',
          as: 'marketId',
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
      open: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      high: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      low: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      close: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      volume: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Candle'),
};