const express = require('express');

const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  // console.log('I am here');
  console.log('backend');

  if (res.locals.success) return res.sendStatus(200);
  else {
    res.status(400).json(res.locals.error);
  }
  // res.status(200).json(JSON.stringify({ success: res.locals.success }));
});

router.post('/login', userController.verifyUser, (req, res) => {
  console.log('signing in');

  if (res.locals.success)
    return res.status(200).json({ user_id: res.locals.id });
  else {
    res.status(400).json(res.locals.error);
  }
});

module.exports = router;
