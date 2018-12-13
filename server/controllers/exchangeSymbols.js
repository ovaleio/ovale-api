const ExchangeSymbol = require('../models').ExchangeSymbol;

module.exports = {
  create(req, res) {
    return ExchangeSymbol
      .create({
        currencyId: req.body.currencyId,
        exchangeId: req.body.exchangeId || req.params.exchangeId,
        symbol: req.body.symbol
      })
      .then(exchangeSymbol => res.status(201).send(exchangeSymbol))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return ExchangeSymbol
      .find({
        where: {
          id: req.params.exchangeSymbolId
        },
      })
      .then(exchangeSymbol => {
        if (!exchangeSymbol) {
          return res.status(404).send({
            message: 'ExchangeSymbol Not Found',
          });
        }

        return exchangeSymbol
          .update({
            currencyId: req.body.currencyId || exchangeSymbol.currencyId,
            exchangeId: req.body.exchangeId || exchangeSymbol.exchangeId,
            symbol: req.body.symbol || exchangeSymbol.symbol,
          })
          .then(updatedExchangeSymbol => res.status(200).send(updatedExchangeSymbol))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return ExchangeSymbol
      .find({
        where: {
          id: req.params.exchangeSymbolId,
        },
      })
      .then(exchangeSymbol => {
        if (!exchangeSymbol) {
          return res.status(404).send({
            message: 'ExchangeSymbol Not Found',
          });
        }

        return exchangeSymbol
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
