const Event = require('../models/EventModel');

const EventController = {};

// ---ADD-EVENT--------------------------------------------------

EventController.addEvent = (req, res, next) => {
  console.log('add event');

  const {
    eventName,
    eventHost,
    eventAddress,
    eventDescr,
    contact,
    eventType
  } = req.body;

  console.log('REQ -----> ', req.body);
  const createdDate = new Date();
  const eventDate = new Date();

  // console.log(createdDate);
  // console.log(eventDate);

  const query = {
    eventName,
    createdDate,
    eventHost,
    eventDate,
    eventAddress,
    eventDescr,
    contact,
    eventType
  };

  console.log('QUERY -------->', query);

  Event.create(query, (err, data) => {
    // console.log("inside here");
    if (err) {
      res.locals.error = err;
      res.locals.success = false;
      return next();
    }
    // console.log("inside event create");
    console.log('data', data);
    res.locals.success = true;
    res.locals.event = data;
    return next();
  });
};

EventController.getSingleEvent = (req, res, next) => {
  console.log('get single event');

  console.log(req.body);

  const { event_id } = req.body;

  Event.findById({ _id: event_id }, (err, data) => {
    console.log('inside here');
    if (err) {
      res.locals.error = err;
      res.locals.success = false;
      return next();
    }
    console.log('inside event get single');
    console.log('data', data);
    res.locals.success = true;
    res.locals.event = data;
    return next();
  });
};

module.exports = EventController;
