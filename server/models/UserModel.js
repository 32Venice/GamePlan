const { Pool, Client } = require('pg');

// Need to add Pool database server information
const pool = new Pool({
  connectionString:
    'postgres://taqaoqhk:4IUCWtGGcJ0Oy4EG6fefLYd56jPS21wD@salt.db.elephantsql.com:5432/taqaoqhk'
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    if (callback)
      return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        // console.log(res);
        // console.log('Executed query ', { text, duration, rows: res.rowCount });
        callback(err, res);
      });
    return pool.query(text, params);
  }
};
