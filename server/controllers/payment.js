const { Payment, User } = require('../models');
const stripe    = require("stripe")("sk_test_xL4YQhngE057wJm1ttKN7LnH");
const fs        = require("fs");
const jwt       = require('jsonwebtoken');

// Reads the privkey to sign and verify jwt
const privateKey = fs.readFileSync('./key/private.key');

module.exports = {

    // Controller  : Create Payment
    // Description : Initiate a payment through the Payment model
    // Success : header 200 {id: paymentid, newValidUntil:newValidUntil}
    // Error : e.code 400 {errorCode: errorCode, errorMessage:errorMessage}
    createPayment(req, res) {
        
        // We verify the inputs
        try {
            verifyInputs(req);
        } catch (e) { return res.status(400).send(e.message) };

        // We verify the jwt and sotres the output in a validJWT var
        try {
            var validJWT = verifyToken(req);
        } catch (e) { return res.status(400).send(e.message) };

        // we send a payment : 
        sendPayment(validJWT.data.email, req.body.stripeToken).then(result=>{
            return res.status(200).send(result);
        }).catch(e=>{
            return res.status(400).send(e.message);
        })

       
    }
};

async function sendPayment(email, stripeToken) {

    console.log(stripeToken)
    // find user with email
    let user = await User.find({ where: { "email": email } });
    if(!user) throw new Error ("This account is not yet created"); 

        // Create a new customer and then a new charge for that customer:
    let payment = stripe.customers.create({
        email: email
    }).then((customer) => {
        console.log("customer: ", customer)

        return stripe.charges.create({
            amount: 9999,
            currency: 'eur',
            description: '1 year licence for ' + email,
            source: stripeToken.id,
            receipt_email: email
        });
    }).then((charge) => {
        // New charge created on a new customer
        console.log("charge: ", charge);
        let payment = Payment.create({
            stripeEmail     : email,
            stripeChargeId  : charge.id,
            stripeAmount    : charge.amount,
            stripeSource    : stripeToken.id,
            UserId          : user.id
        });
        return payment;
    }).then((payment)=>{
        console.log(payment)
        // new Date 
        var addYear = new Date();
        addYear.setFullYear(addYear.getFullYear() + 1);
        user.update(
        {
            validUntil: addYear,
            trial:false
        });
        return payment;
    }).catch((err) => {
        // Deal with an error
        console.error("Error : ", err)
        throw new Error(err.message); 
    });
  
    return payment;

}


function verifyInputs(req) {
    if(!req.body.stripeToken) throw new Error("token not found");
    if(!req.body.email)       throw new Error("email not found");
    if(!req.body.jwt)         throw new Error("jwt not found");
    return req;
}

function verifyToken(req) {
        // We validate the jwt 
        let jwtDecoded =  jwt.verify(req.body.jwt, privateKey);
        if(!jwtDecoded.data.email) throw new Error("jwt not valid");
        return jwtDecoded;
}