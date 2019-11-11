const express = require("express");

const activitiesController = require("../controllers/ActivitiesController");

const router = express.Router();

router.post("/", activitiesController.getItems, (req, res) =>
  res.status(200).json(res.locals.activity)
);

router.post("/addItem", activitiesController.addItem, (req, res) => {
  console.log("in Post Router");
  if (res.locals.success) {
    res.status(200).json(res.locals.activity);
  } else {
    res.status(400).json(res.locals.error);
  }
});

// router.put("/updateItem", activitiesController.updateItem, (req, res) =>
//   res.status(200).json([...res.locals.activity])
// );

router.delete("/deleteItem", activitiesController.deleteItem, (req, res) =>
  res.status(200).json(res.locals.activity)
);

module.exports = router;
