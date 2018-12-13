'use strict';

/*
  stripeEmail     : payload.email,
                stripeChargeId  : data.id,
                stripeAmount    : data.amount,
                source          : payload.token,
                UserId          : user.id*/

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    stripeEmail: DataTypes.STRING,
    stripeChargeId: DataTypes.STRING,
    stripeAmount: DataTypes.INTEGER,
    stripeSource : DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
      allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now'),
        allowNull: false
    }
  });



  Payment.associate = function(models) {
    // Will Add UserId to Payment
    Payment.belongsTo(models.User);
  };
  return Payment;
};
