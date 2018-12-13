require('pretty-error').start();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')

const app = express();

app.use(cors())
app.use(logger('dev'));
app.listen(1337)
app.use(bodyParser.json());
app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
require('./server/routes/users')(app);
require('./server/routes/payments')(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));
module.exports = app;
