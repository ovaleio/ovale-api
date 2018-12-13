const Exchange = require('../models').Exchange;
const ExchangeSymbol = require('../models').ExchangeSymbol;
const Market = require('../models').Market;

module.exports = {

  create(req, res) {
    return Exchange
      .create({
        name: req.body.name,
        pairPattern: req.body.pairPattern
      })
      .then((exchange) => res.status(201).send(exchange))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Exchange
      .findAll({})
      .then((exchanges) => res.status(200).send(exchanges))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Exchange
      .findById(req.params.exchangeId, {
        include: [{
          model: ExchangeSymbol,
          as: 'symbols',
        }, {
          model: Market,
          as: 'markets'
        }],
      })
      .then((exchange) => {
        if (!exchange) {
          return res.status(404).send({
            message: 'Exchange Not Found',
          });
        }
        return res.status(200).send(exchange);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Exchange
      .findById(req.params.exchangeId)
      .then(exchange => {
        if (!exchange) {
          return res.status(404).send({
            message: 'Exchange Not Found',
          });
        }
        return exchange
          .update({
            name: req.body.name || exchange.name,
            pairPattern: req.body.pairPattern || exchange.pairPattern,
          })
          .then(() => res.status(200).send(exchange))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Exchange
      .findById(req.params.exchangeId)
      .then(exchange => {
        if (!exchange) {
          return res.status(400).send({
            message: 'Exchange Not Found',
          });
        }
        return exchange
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
