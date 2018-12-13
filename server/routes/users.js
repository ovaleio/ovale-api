const Controllers = require('../controllers');

module.exports = (app) => {

    /**
     * Post a new user
     * @route POST /users
     * @group Users - Operations about users
     * @param {string} query.email.required - email
     * @param {string} query.password.required - password
     * @param {string} query.password.jwt - a valid jwt returned by the server
     * @returns {object} 201 - A JWT signed by server with next payment.
     * @returns {Error}  400 - Returned error
     */
    app.post('/users/register',  Controllers.users.create);

     /**
     * Authenticate user password
     * @route POST /users/authenticate
     * @group Users - Operations about users
     * @param {string} query.email.required - email
     * @param {string} query.password.required - password
     * @returns {object} 200 - A JWT signed by server with next payment.
     * @returns {Error}  400 - Message
     */
    app.post('/users/authenticate',  Controllers.users.retrieve);

    /**
     * Authenticate email
     * @route POST /users/authenticate/email
     * @group Users - Operations about users
     * @param {string} query.email.required - email
     * @returns {object} 200 - Email of the user
     * @returns {Error}  400 - Message
     */
    app.post('/users/authenticate/email',  Controllers.users.retrieveEmail);

    
    app.post('/users/authenticate/jwt',  Controllers.users.verifyJWT);

    

     /**
     * Digits Verification
     * @route POST /users/authenticate/digits
     * @group Users - Operations about users
     * @param {string} query.email.required - email
     * @param {string} query.digits.required - digits
     * @returns {object} 200 - jwt containing the user email and a allowAction 'createUser'
     * @returns {Error}  400 - Message
     */
    app.post('/users/authenticate/digits',  Controllers.users.verifyDigits);

     /**
     * Send another email
     * @route POST /users/authenticate/digits/resend
     * @group Users - Operations about users
     * @param {string} query.email.required - email
     * @returns {object} 200 - a success message
     * @returns {Error}  400 - Message
     */
    app.post('/users/authenticate/digits/resend',  Controllers.users.retrieveEmail);



     /**
     * Edit Name
     * @route POST /users/edit/name
     * @group Users - Operations about users
     * @param {string} query.email.required - email
     * @param {string} query.jwt.required - email
     * @param {string} query.name.required - email
     * @returns {object} 200 - Confirmation message
     * @returns {Error}  400 - Message
     */
    app.post('/users/edit/name',  Controllers.users.editName);

    
    app.put('/users/:userid',  () =>{return });
};
