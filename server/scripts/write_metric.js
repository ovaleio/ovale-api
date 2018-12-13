const db = require('../db/db.js');

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

async function saveMetric (marketId, metrics) {
	try { 
		const sql = `INSERT INTO "MarketMetric" ("marketId", time_open, time_close, open, high, low, close, volume, market_average_price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
		const res = await db.query(sql, [marketId, ...Object.values(metrics)])
		console.log(res);
	}
	catch (error) {
		console.log(error);
	}
}

async function main () {
	let res = await db.query(`SELECT * FROM "Candles" WHERE time_close < CURRENT_DATE - interval '24 hours' AND time_open > CURRENT_DATE - interval '48 hours';`);

	let candles = res.rows;
	let i = 0;

	const accumulator = (acc, cur) => {
		const avg_price = acc.market_average_price || 0;

		const obj =  {
			time_open: cur.time_open < acc.time_open ? cur.time_open : acc.time_open,
			time_close: cur.time_close > acc.time_close ? cur.time_close : acc.time_close,
			open: cur.time_open < acc.time_open ? cur.open : acc.open,
			high: Math.max(acc.high, cur.high),
			low: Math.min(acc.low, cur.low),
			close: cur.time_close > acc.time_close ? cur.close : acc.close,
			volume: acc.volume + cur.volume,
			market_average_price: avg_price + ( 1 / (i + 1) ) * (cur.close - avg_price)
		}
		i++;
		return obj;
	}

	const candlesByMarket = groupBy(candles, 'marketId')

	Object.keys(candlesByMarket).forEach((marketId) => {
		const values = candlesByMarket[marketId].reduce(accumulator);
		saveMetric(marketId, values);
		console.log(values);
	}) 
}

main();