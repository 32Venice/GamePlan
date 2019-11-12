const db = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = createUser = async (req, res, next) => {
  console.log('Sign up');

  // console.log(req);
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;
  let values;

  // console.log(res);

  let hashPromise = new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        values = [username, hash];
        // console.log(values);
        resolve(values);
      });
    });
  });

  values = await hashPromise;

  // console.log('here');
  // console.log(values);

  await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2)',
    values,
    (err, response) => {
      if (err) {
        res.locals.error = err;
        res.locals.success = false;
        return next();
      }

      // console.dir(response);
      console.log(response);

      res.locals.success = true;

      return next();
    }
  );
};

userController.verifyUser = verifyUser = async (req, res, next) => {
  console.log('Log in');

  // console.log(req);
  if (req.body.username.length > 0 && req.body.password.length > 0) {
    const username = req.body.username;
    const password = req.body.password;

    const values = [username];

    await db.query(
      'SELECT * FROM users WHERE username = $1',
      values,
      (err, response) => {
        if (err) {
          res.locals.error = err;
          res.locals.success = false;
          return next();
        }

        console.log(response.rows);
        if (response.rows.length > 0) {
          bcrypt.compare(password, response.rows[0].password, function(
            err,
            isMatch
          ) {
            if (err) return next(err);

            if (isMatch) {
              res.locals.id = response.rows[0].user_id;
              res.locals.username = response.rows[0].username;
              res.locals.success = true;
              return next();
            } else {
              res.locals.success = false;
              return next();
            }
          });
        } else {
          res.locals.success = false;
          return next();
        }
      }
    );
  } else {
    res.locals.success = false;
    return next();
  }
};

module.exports = userController;

// db.query('SELECT * FROM users', null, (err, res) => {
//   if (err) console.log(err);
//   console.log(res);
// });
