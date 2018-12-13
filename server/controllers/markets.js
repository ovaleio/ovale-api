const { Currency, Exchange, Market } = require('../models')

module.exports = {
  create(req, res) {
    return Market
      .create({
        tradingPair: req.body.tradingPair,
        exchangeId: req.params.exchangeId || req.body.exchangeId,
        unitCurrencyId: req.body.unitCurrencyId,
        baseCurrencyId: req.body.baseCurrencyId,
      })
      .then((market) => res.status(201).send(market))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Market
      .findAll({
        include: [{
          model: Exchange,
          as: 'exchange',
        },{
          model: Currency,
          as: 'unitCurrency',
        },{
          model: Currency,
          as: 'baseCurrency',
        }],
      })
      .then((markets) => res.status(200).send(markets))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Market
      .findById(req.params.marketId, {
        include: [{
          model: Exchange,
          as: 'exchange',
        },{
          model: Currency,
          as: 'unitCurrency',
        },{
          model: Currency,
          as: 'baseCurrency',
        }],
      })
      .then((market) => {
        if (!market) {
          return res.status(404).send({
            message: 'Market Not Found',
          });
        }
        return res.status(200).send(market);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Market
      .findById(req.params.marketId)
      .then(market => {
        if (!market) {
          return res.status(404).send({
            message: 'Market Not Found',
          });
        }
        return market
          .update({
            tradingPair: req.body.tradingPair || market.tradingPair,
            exchangeId: req.body.exchangeId || market.exchangeId,
            unitCurrencyId: req.body.unitCurrencyId || market.unitCurrencyId,
            baseCurrencyId: req.body.baseCurrencyId || market.baseCurrencyId,
          })
          .then(() => res.status(200).send(market))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Market
      .findById(req.params.marketId)
      .then(market => {
        if (!market) {
          return res.status(400).send({
            message: 'Market Not Found',
          });
        }
        return market
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
