'use strict';

const sendMails = require('../scripts/send_mails.js');

// RAND GENERATOR
function generate(n) {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

  if ( n > max ) {
          return generate(max) + generate(n - max);
  }

  max        = Math.pow(10, n+add);
  var min    = max/10; // Math.pow(10, n) basically
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;

  return ("" + number).substring(add); 
}


module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;

  const Verification = sequelize.define('Verifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: DataTypes.STRING,
    digits: DataTypes.STRING,
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

  /*
  VERIFY IF THE 6 DIGITS ENTERED ARE GOOD
  */
  Verification.verify = async function(email, digits) {
    try{

      // We Verify the data in the range of the last 15 minutes.
        const verify = await Verification.findOne({
          where: {
            email,
            digits,
            createdAt:{
              [Op.gt]: new Date(new Date() - 15 * 60  * 1000)
            }
          }
        });
        if(verify!==null){
          return true;
        } else {
          return false;
        }
    }catch(e){
        throw new Error(e);
    }
  };


  /*
  SENDS AN EMAIL WITH A 6 DIGIT TOKEN, STORES IT
  Duration : between 2 emails
  */
  Verification.sendMail = async function(email, duration=1) {

      // We check all where email and created lowerthan 1 minutes.
      const verify = await Verification.findOne({
        where: {
          email,
          createdAt:{
            [Op.gt]: new Date(new Date() - duration * 60 * 1000)
          }
        }
      });
      
      // If nthing, we send an 3mail
      if(verify===null){
        // We generate a new 6 digits token
        const digits = generate(6);

        // We store email and digits
        Verification.create({
            email: email,
            digits: digits
        }).then(()=>{
          // non blocking
          return sendMails.sendVerificationMail(email, digits);
        });
        
      }
   
  };
  
  return Verification;
};