const Event = require('../models/EventModel');

const EventController = {};

// ---ADD-EVENT--------------------------------------------------

EventController.addEvent = (req, res, next) => {
  console.log('add event');
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
    console.log(data);
    res.locals.events = data;
    // res.status(200).send(data);
    return next();
  });
};

// ---ADD-ITEM--------------------------------------------------

// EventController.addItem = (req, res, next) => {
//   const { item, claimed, claimedBy } = req.body;
//   Event.findOneAndUpdate({ item }, (err, data) => {
//     if (err) {
//       res.status(418);
//     }
//     res.locals.items = data;
//     res.status(200).send(data);
//   });
// };
// ---DELETE-ITEM--------------------------------------------------

// EventController.deleteItem = (req, res, next) => {
//   Event.findOneAndDelete({ item: req.params.name }, (err, data) => {
//     if (err) {
//       res.status(418);
//     }
//     res.status(200).send(data);
//   });
// };

// ----GET-ITEMS----------------------------------------

// EventController.getItems = (req, res, next) => {
//   Event.find({ item: req.params.item }, (err, data) => {
//     if (item) {
//       res.locals.items = data;
//       res.status(200).send(data);
//     } else {
//       res.status(419);
//     }
//   });
// };

// ----UPDATE-ITEMS----------------------------------------

// EventController.updateItems = (req, res, next) => {
//   const curAssignee = req.params.name;
//   const newAssignee = req.params.claimedBy;
//   Event.findOneAndUpdate(
//     { claimedBy: curAssignee },
//     { claimedBy: newAssignee },
//     (err, data) => {
//       if (data) {
//         res.claimedBy = req.body;
//         res.status(200).send(data);
//       } else {
//         res.status(418);
//       }
//     }
//   );
// };

module.exports = EventController;
