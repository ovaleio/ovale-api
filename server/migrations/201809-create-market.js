module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Markets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tradingPair: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      exchangeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Exchanges',
          key: 'id',
          as: 'exchangeId',
        },
      },
      unitCurrencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Currencies',
          key: 'id',
          as: 'unitCurrencyId',
        },
      },
      baseCurrencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Currencies',
          key: 'id',
          as: 'baseCurrencyId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Markets'),
};
