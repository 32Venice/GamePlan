const { Pool, Client } = require('pg');

// Need to add Pool database server information
const pool = new Pool();

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
