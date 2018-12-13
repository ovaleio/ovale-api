const { Candle } = require('../models')

module.exports = {
  retrieve(req, res) {
    return Candle
      .findAll({
        where: { marketId: req.params.marketId },
        order: [['time_open', 'ASC']]
      })
      .then((candles) => {
        const tuples = candles.map((candle) => [
          candle.time_open,
          [
            candle.open,
            candle.high,
            candle.low,
            candle.close
          ],
          candle.volume
        ]);

        req.query.tuple === '1'
          ? res.status(200).send(tuples)
          : res.status(200).send(candles);
      })
      .catch((error) => res.status(400).send(error));
  },
}