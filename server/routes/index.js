
const Controllers = require('../controllers');

const prefixUrl = process.env.NODE_ENV === 'production' ? '' :  '/api';

module.exports = (app) => {
    app.get(prefixUrl,  (req, res) => res.status(200).send({
        message: 'Welcome to the Ovale API!',
    }));

    /**
     * @api {post} /exchanges Post a new exchange
     * @apiName newExchange
     * @apiGroup Exchanges
     *
     * @apiParam {name} Name of the Exchange
     * @apiParam {pairPattern} Pattern for the pairs
     *
     * @apiSuccess {Object} Exchange created.
     */
    app.post(prefixUrl+'/exchanges', Controllers.exchanges.create);



    app.get(prefixUrl+'/exchanges', Controllers.exchanges.list);
    app.get(prefixUrl+'/exchanges/:exchangeId', Controllers.exchanges.retrieve);
    app.put(prefixUrl+'/exchanges/:exchangeId', Controllers.exchanges.update);
    app.delete(prefixUrl+'/exchanges/:exchangeId', Controllers.exchanges.destroy);
    app.post(prefixUrl+'/exchanges/:exchangeId/symbols', Controllers.exchangeSymbols.create);
    app.put(prefixUrl+'/exchanges/:exchangeId/symbols/:exchangeSymbolId', Controllers.exchangeSymbols.update);
    app.delete(prefixUrl+'/exchanges/:exchangeId/symbols/:exchangeSymbolId', Controllers.exchangeSymbols.destroy);
    app.post(prefixUrl+'/exchanges/:exchangeId/markets', Controllers.markets.create);

    app.post(prefixUrl+'/markets', Controllers.markets.create);
    app.get(prefixUrl+'/markets', Controllers.markets.list);
    app.get(prefixUrl+'/markets/:marketId', Controllers.markets.retrieve);
    app.put(prefixUrl+'/markets/:marketId', Controllers.markets.update);

    app.post(prefixUrl+'/currencies', Controllers.currencies.create);
    app.get(prefixUrl+'/currencies', Controllers.currencies.list);
    app.get(prefixUrl+'/currencies/:currencyId', Controllers.currencies.retrieve);

    app.get(prefixUrl + '/candles/retrieve/:marketId', Controllers.candles.retrieve);

};
