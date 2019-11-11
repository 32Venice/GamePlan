const express = require("express");
const shoppingListController = require("../controllers/ShoppingListController");
const router = express.Router();

router.post("/", shoppingListController.getItems, (req, res) =>
  res.status(200).json(res.locals.items)
);

router.post("/addItem", shoppingListController.addItem, (req, res) => {
  console.log("in Post Router");
  if (res.locals.success) {
    res.status(200).json(res.locals.items);
  } else {
    res.status(400).json(res.locals.error);
  }
});

router.put("/updateItem", shoppingListController.updateItem, (req, res) =>
  res.status(200).json(res.locals.items)
);

router.delete("/deleteItem", shoppingListController.deleteItem, (req, res) =>
  res.status(200).json(res.locals.items)
);

module.exports = router;

