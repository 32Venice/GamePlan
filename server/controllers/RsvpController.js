const Event = require("../models/EventModel");
const RsvpController = {};


//GET PEOPLE FROM THE RSVP LIST 

RsvpController.getGuests = (req, res, next) => {
  const { event_id } = req.body;
  Event.findOne({ _id: event_id }, (err, data) => {
    if (err) {
      res.locals.error = err;
      res.locals.success = false;
      return next();
    }
    console.log("MY DATA ---> ", data.guests);
    res.locals.guests = data.guests;
    res.locals.success = true;
    return next();
  });
};


// ADD PERSON TO THE LIST 

RsvpController.addGuest = (req, res, next) => {
    const { guests, event_id } = req.body;
    console.log('This is RsvpController.addGuest')

    Event.findOneAndUpdate(
      { _id: event_id },
      { $push: { guests: {
        'user_name': guests.user_name,
        'rsvp': guests.rsvp
    } }},
      (err, data) => {
        if (err) {
          res.locals.error = err;
          res.locals.success = false;
          return next();
        }
        res.locals.guests = data;
        res.locals.success = true;
        return next();
      }
    );
  };


  //DELETE THE STATUS OF THE RSVP

  RsvpController.deleteGuest = (req, res, next) => {
    const { event_id,guest } = req.body;

    Event.findOneAndUpdate(
      { _id: event_id },
      { $pull: { guests: guest }},
      (err, data) => {
        if (err) {
          res.locals.error = err;
          res.locals.success = false;
          return next();
        }
        res.locals.guests = data;
        res.locals.success = true;
        return next();
      }
    );
  };
  
  


module.exports = RsvpController;