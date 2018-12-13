'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        try{
            queryInterface.createTable('Users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                email: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                password: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                name: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                validUntil: {
                    type: Sequelize.DATE
                },
                trial: {
                    type: Sequelize.BOOLEAN
                }
            });
        } catch(e){
            console.log(e)
        }
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};