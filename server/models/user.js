'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require('fs');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING,
                unique:true,
                validate:{
                    len: {
                        args: [6, 128],
                        msg: "Email address must be between 6 and 128 characters in length"
                    },
                    isEmail: {
                        msg: "Email address must be valid"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    checkPassword: pass=> {
                        if(!pass){
                            throw new Error('Password must be set')
                        }
                    }
                }
            },
            name: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('now'),
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('now'),
                allowNull: false
            },
            validUntil: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW() + INTERVAL '1 MONTH'")
            },
            trial: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        });


        User.createUser = async function(email, password) {
            // Finds the validation errors in this request and wraps them in an object with handy functions
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(422).json({ errors: errors.array() });
           }
           try{
               const user = await User.findOne({ where: { email } });
               if(user!==null){
                   if (bcrypt.compareSync(password, user.password)) {
                       return user.authorize();
                   } else {
                       throw "User doesn't exist";
                   }
               }
               throw "User doesn't exist";
           }catch(e){
               throw new Error(e);
           }
       };


    User.authenticate = async function(email, password) {
        
        try{
            const user = await User.findOne({ where: { email } });
            if(user!==null){
                if (bcrypt.compareSync(password, user.password)) {
                    return user.authorize();
                } else {
                    throw "User doesn't exist";
                }
            }
            throw "User doesn't exist";
        }catch(e){
            throw new Error(e);
        }
    };


    // We find an user by email, we remove the password and send the jwt
    User.findByEmail = async function(email) {
        console.log('Find by email : ', email)
        try{
            const user = await User.findOne({ where: { email } });
            if(user!==null){
                return user.email
            } else {
                return false;
            }
        } catch(e){
            throw new Error(e);
        }
    };


    // We let edit username
    User.editName = async function(email, name) {
        console.log('Edit Name')
        try{
            
            let user = User.update(
                {
                    name,
                    updatedAt: null,
                },
                {
                    where: { "email": email }
                }
            );

            if(user!==null){
                return true;
            } else {
                return false;
            }
        } catch(e){
            throw new Error(e);
        }
    };


    // We extends the licence and returns the new user.
    User.extendsLicence = function(timespan="1 YEAR", email) {
        return User.update(
            {
                validUntil: sequelize.literal("validUntil + INTERVAL '"+timespan+"'"),
                updatedAt: null,
            },
            {
                where: { "email": email }
            }
        ).then(res=>{
            return res;
        }).catch(e=>{
            throw e;
        });
    };


    User.prototype.authorize = async function () {

        let userData = {
            email: this.email,
            createdAt: this.createdAt,
            validUntil: this.validUntil
        };
        let expiration = Math.floor(Date.now() / 1000) + (60 * 60);
        const privateKey = fs.readFileSync('./key/private.key');
        let token = await jwt.sign({ data: userData }, privateKey, { expiresIn: expiration});
        return {message:"Login successful", email:this.email, jwt: token, validUntil: this.validUntil}

    };




    User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, saltRounds).then(bcrypt3d => {
            user.password = bcrypt3d;
        });
    });
    
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Payment);
    };
    return User;
};