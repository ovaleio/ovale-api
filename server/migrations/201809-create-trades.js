module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Trades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      marketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Markets',
          key: 'id',
          as: 'marketId',
        },
      },
      mts: {
        type: Sequelize.BIGINT
      },
      exchangeTradeId: {
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Trades'),
};
