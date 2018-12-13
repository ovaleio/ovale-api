const { Currency } = require('../models')

module.exports = {
  create(req, res) {
    return Currency
      .create({
        symbol: req.body.symbol,
        name: req.body.name,
        type: req.body.type,
        hexColor: req.body.hexColor,
      })
      .then((currency) => res.status(201).send(currency))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Currency
      .findAll({})
      .then((currencies) => res.status(200).send(currencies))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Currency
      .findById(req.params.currencyId)
      .then((currency) => {
        if (!currency) {
          return res.status(404).send({
            message: 'Currency Not Found',
          });
        }
        return res.status(200).send(currency);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Currency
      .findById(req.params.currencyId)
      .then(currency => {
        if (!currency) {
          return res.status(404).send({
            message: 'Currency Not Found',
          });
        }
        return currency
          .update({
            symbol: req.body.symbol || currency.symbol,
            name: req.body.name || currency.name,
            type: req.body.type || currency.type,
            hexColor: req.body.hexColor || currency.hexColor
          })
          .then(() => res.status(200).send(currency))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Currency
      .findById(req.params.currencyId)
      .then(currency => {
        if (!currency) {
          return res.status(400).send({
            message: 'Currency Not Found',
          });
        }
        return currency
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
