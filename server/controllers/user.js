
const { User, Verifications } = require('../models');
const validator = require('validator');
const fs = require('fs')
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./key/private.key');


module.exports = {
    create(req, res) {
        
        // NEVER TRUST USER INPUTS
        if(!req.body.email) return res.status(400).send('NOT ALLOWED 1')
        if(!req.body.password) return res.status(400).send('NOT ALLOWED 2')
        if(!req.body.jwt) return res.status(400).send('NOT ALLOWED 3')
        if(!validator.isEmail(req.body.email)) return res.status(400).send('NOT ALLOWED 4')

        let valid = jwt.verify(req.body.jwt, privateKey)
        let email = req.body.email.toLowerCase();
        
        if(valid.data.email === email && valid.data.allowedAction ==='createUser'){
            return User.findOne({ where: { "email": email } })
            .then(user=>{
                if(!user){
                     User.create({
                        email: email,
                        password:  req.body.password,
                    }).then(async (user) => {
                        let userObject = await user.authorize();
                        console.log(userObject)
                        res.status(201).send(userObject)
                    })
                } else {
                    res.status(400).send({'message':'This user already exists'})
                }
            })
            .catch((error) => res.status(400).send(error));
        } else{
            res.status(400).send({'message':'Invalid token or token expired'})
        }
        
    },

    editName(req, res) {
        if(!req.body.name) return res.status(400).send('NOT ALLOWED 1')
        if(!req.body.email) return res.status(400).send('NOT ALLOWED 3')
        if(!req.body.jwt) return res.status(400).send('NOT ALLOWED 3')

        let valid = jwt.verify(req.body.jwt, privateKey)
        
        if(valid.data.email === req.body.email){
            return User
                .editName(req.body.name, req.body.email)
                .then(() => res.status(200).send({'message':'user edited successfully'}))
                .catch((error) => res.status(400).send(error));
        }
    },

    // Checks if the user exists (login purpose)
    // Route /users/authenticate
    retrieve(req, res) {
         // NEVER TRUST USER INPUTS
         if(!req.body.email) return res.status(400).send('NOT ALLOWED')
         if(!req.body.password) return res.status(400).send('NOT ALLOWED')
         if(!validator.isEmail(req.body.email))return res.status(400).send('NOT ALLOWED')
        let email = req.body.email.toLowerCase();

        return User
            .authenticate(email, req.body.password)
            .then((user) => {
                return res.status(200).send(user);
            })
            .catch((error) => {
                res.status(400).send({message: error.message})
            });
    },

    // Checks if the email exists (register purpose)
    // Route /users/authenticate/email
    retrieveEmail(req, res) {
         // NEVER TRUST USER INPUTS
         if(!req.body.email) return res.status(400).send('NOT ALLOWED')
         if(!validator.isEmail(req.body.email)) return res.status(400).send('NOT ALLOWED')

        let emailFormatted = req.body.email.toLowerCase();
         
        return User
            .findByEmail(emailFormatted)
            .then((email) => {

                if(email === false) {
                    Verifications
                        .sendMail(emailFormatted, 1)
                        .then(() => {
                                res.status(200).send({
                                    'email:':emailFormatted,
                                    'result': 'an email has been sent'
                                });
                        })
                        .catch((error) => {
                            res.status(400).send({message: error.message})
                        });
                    
                } else {
                    return res.status(200).send({'email': emailFormatted});
                }
                
            })
            .catch((error) => {
                console.error(error)
                res.status(400).send( {'message:':error.message})
            });
    },

    // Checks if the digits verification is good 
    // Route /users/authenticate/digits
    verifyDigits(req, res) {
        // NEVER TRUST USER INPUTS
        if(!req.body.email) return res.status(400).send('NOT ALLOWED')
        if(!req.body.digits) return res.status(400).send('NOT ALLOWED')
        if(!validator.isEmail(req.body.email)) return res.status(400).send('NOT ALLOWED')

        let email = req.body.email.toLowerCase();
        return Verifications
           .verify(email, req.body.digits)
           .then((user) => {
               console.log(user)
               if(user === true) {
                   //generate token
                   let userData = {
                        email : email,
                        allowedAction: 'createUser' 
                    };
                    let token = jwt.sign({ data: userData}, privateKey);

                    return res.status(200).send({'result':token});
               } else {
                   // return wrong data
                   return res.status(400).send( {'message:':'Wrong digits or digits expired'})
               }
           })
           .catch((error) => {
               res.status(400).send({message: error.message})
           });
   },

    verifyJWT(req, res) {
        // NEVER TRUST USER INPUTS
        if(!req.body.jwt) return res.status(400).send('NOT ALLOWED')
    
        jwt.verify(req.body.jwt, privateKey, function(err, valid) {
            if (err) return res.status(400).send({message: err.message});
            console.log(valid.data.email)

            if(valid.data.email){

                User
                .findOne({where:{email: valid.data.email}})
                .then((user) => {
                    return user.authorize();
                })
                .then(jwt=> {
                    return res.status(200).send(jwt);
                })
                .catch((error) => {
                    return res.status(400).send({message: error.message})
                });
            }
        });
        
        
    },


};
