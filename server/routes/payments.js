const Controllers = require('../controllers');

module.exports = (app) => {
    app.post('/payments', Controllers.payments.createPayment);
}