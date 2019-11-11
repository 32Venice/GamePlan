const express = require('express');
const eventController = require('../controllers/EventController');
const router = express.Router();

router.post('/addevent', eventController.addEvent, (req, res) => {
  console.log('in router add event');
  if (res.locals.success) {
    res.status(200).json(res.locals.event);
  } else res.status(400).json(res.locals.error);
});

router.post('/singleevent', eventController.getSingleEvent, (req, res) => {
  console.log('in router get single event');
  if (res.locals.success) {
    res.status(200).json(res.locals.event);
  } else res.status(400).json(res.locals.error);
});

module.exports = router;
