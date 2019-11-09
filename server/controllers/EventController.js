const Event = require("../models/EventModel");

const EventController = {};

// ---ADD-EVENT--------------------------------------------------

EventController.addEvent = (req, res, next) => {
  console.log("add event");
  const {
    eventName
    // eventHost.user_name,
    // eventDate
    // eventAddress,
    // eventDescr,
    // eventType
  } = req.body;
  Event.create({ eventName }, (err, data) => {
    if (err) {
      res.status(418);
    }
    res.locals.events = data;
    // res.status(200).send(data);
    return next();
  });
};

module.exports = EventController;
