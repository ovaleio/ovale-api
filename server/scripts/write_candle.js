const db = require('../db/db.js');

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i.toString();
}

async function main () {
	let res = await db.query(`SELECT * FROM "Trades" WHERE date < CURRENT_DATE - interval '24 hours' AND date > CURRENT_DATE - interval '48 hours';`);

	console.log(res.rows);

	let candles = {};

	res.rows.forEach((row) => {
		console.log(row.date);

		let n = row.date.getMinutes();
		let h = row.date.getHours();

		let key1 = row.marketId;
		let key2 = addZero(h) + addZero(n);

		// initalize candles for each new marketId
		if (candles[key1] === undefined) candles[key1] = {};

		//initalize candles for every minute
		if (candles[key1][key2] === undefined) {
			candles[key1][key2] = {
				o: row.price,
				h: row.price,
				l: row.price,
				c: row.price,
				v: Math.abs(row.amount),
				to: row.date,
				tc: row.date
			}
		}
		else {
			const lastInsert = candles[key1][key2];
			candles[key1][key2] = {
				o: row.date < lastInsert.to ? row.price : lastInsert.o,
				h: Math.max(row.price, lastInsert.h),
				l: Math.min(row.price, lastInsert.l),
				c: row.date > lastInsert.tc ? row.price : lastInsert.c,
				v: Math.abs(row.amount) + lastInsert.v,
				to: row.date < lastInsert.to ? row.date : lastInsert.to,
				tc: row.date > lastInsert.tc ? row.date : lastInsert.tc,
			}
		}

		return;
	})

	async function saveCandle (marketId, candle) {
		try { 
			const sql = `INSERT INTO "Candles" ("marketId", time_open, time_close, open, high, low, close, volume) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
			const res = await db.query(sql, [marketId, candle.to, candle.tc, candle.o, candle.h, candle.l, candle.c, Math.round(candle.v)])
			console.log(res);
		}
		catch (error) {
			console.log(error);
		}
	}

	Object.keys(candles).map((marketId) => {
		Object.keys(candles[marketId]).map((minute) => {
			return saveCandle(marketId, candles[marketId][minute])
		});
	})
}

main();