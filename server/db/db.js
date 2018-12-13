const config = {
  user: 'ovale', // env var: PGUSER
  database: 'ovale-dev', // env var: PGDATABASE
  password: 'ovale', // env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}
const { Pool } = require('pg')

const pool = new Pool(config);

const query = async (q, values) => {
  const client = await pool.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q, values)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}

module.exports = {
  pool: pool,
  query: query,
  queries: {
    insertTrade: (marketId, mts, exchangeTradeId, amount, price) => `INSERT INTO "Trades" ("marketId", "mts", "exchangeTradeId", "amount", "price", "date") VALUES(${marketId}, ${mts}, ${exchangeTradeId}, ${amount}, ${price}, now());`
  }
}