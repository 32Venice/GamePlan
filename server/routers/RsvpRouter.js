const express = require("express");
const RsvpController = require("../controllers/RsvpController");
const router = express.Router();

//--get

router.post("/", RsvpController.getGuests, (req, res) =>
  res.status(200).json(res.locals.guests)
);

//--post

router.post("/addGuest", RsvpController.addGuest, (req, res) => {
  console.log("AddGuest invoked");

  if (res.locals.success) {
    res.status(200).json(res.locals.guests);
  } else {
    console.log(res.locals.error);
    res.status(400).json(res.locals.error);
  }
});

//--delete

router.delete("/deleteGuest", RsvpController.deleteGuest, (req, res) => {
  console.log("deleteGuest invoked");

  if (res.locals.success) {
    console.log("Guest should be deleted");
    res.status(200).json(res.locals.guests);
  } else {
    console.log(res.locals.error);
    res.status(400).json(res.locals.error);
  }
});

module.exports = router;
