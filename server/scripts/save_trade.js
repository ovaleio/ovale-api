const db = require('../db/db.js');
const Stream = require('../lib/Stream.js');
const conf = {
	wsUrl: () => 'wss://api.bitfinex.com/ws/2',
	subscribeEvent: (symbol) => ({ event: "subscribe", channel: "trades", symbol: symbol }),
	isValid: ({message}) => {
		if (message[1] === 'te') return true;
	},
	format: (message) => {
		console.log('format', message);
		return {
			id: message[2][0],
			mts: message[2][1],
			amount: message[2][2],
			price: message[2][3],
		}
	}
}

let connected

async function saveTrade (trade, marketId) {
	console.log('save', trade);
	const insertQuery = db.queries.insertTrade(marketId, trade.mts, trade.id, trade.amount, trade.price)
	const res = await db.query(insertQuery);
}

async function main () {

	const markets = await db.query('SELECT * FROM "Markets";');
	console.log(markets);

	markets.rows.map(market => {
		console.log(market);
		var stream = new Stream({symbol: market.tradingPair, conf: conf}, (trade) => {
			saveTrade(trade, market.id)
		})
		stream.connect();
	})
}

main();