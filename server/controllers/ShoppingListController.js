const Event = require("../models/EventModel");

const ShoppingListController = {};

ShoppingListController.addItem = (req, res, next) => {
  console.log("in ShoppingListController.addItem");
  const { item, event_id } = req.body;
  console.log(req.body);

  item[itemLikes] = 0;
  item[itemClaimed] = false;
  item[itemClaimedBy] = "";

  Event.findOneAndUpdate(
    { _id: event_id },
    { $push: { shoppingList: item } },
    (err, data) => {
      console.log("MY DATA ---> ", data);
      if (err) {
        res.locals.error = err;
        res.locals.success = false;
        return next();
      }
      console.log("ITS NOT IN ERROR ");
      res.locals.items = data;
      res.locals.success = true;
      return next();
    }
  );
};

ShoppingListController.getItems = (req, res, next) => {
  const { event_id } = req.body;
  Event.findOne({ _id: event_id }, (err, data) => {
    if (err) {
      res.locals.error = err;
      res.locals.success = false;
      return next();
    }
    console.log("MY DATA ---> ", data.shoppingList);
    res.locals.items = data.shoppingList;
    res.locals.success = true;
    return next();
  });
};

ShoppingListController.deleteItem = (req, res, next) => {
  const { event_id, item } = req.body;
  Event.findOneAndUpdate(
    { _id: event_id },
    { $pull: { shoppingList: item } },
    (err, data) => {
      console.log("MY DATA ---> ", data);
      if (err) {
        res.locals.error = err;
        res.locals.success = false;
        return next();
      }
      console.log("ITS NOT IN ERROR ");
      res.locals.items = data;
      res.locals.success = true;
      return next();
    }
  );
};

// ----UPDATE-ITEMS----------------------------------------

// ShoppingListController.updateItem = (req, res, next) => {
//   const curAssignee = req.params.name;
//   const newAssignee = req.params.claimedBy;
//   Event.findOneAndUpdate(
//     { itemClaimedBy: curAssignee },
//     { itemClaimedBy: newAssignee },
//     (err, data) => {
//       if (data) {
//         res.itemClaimedBy = req.body;
//         res.status(200).send(data);
//       } else {
//         res.status(418);
//       }
//     }
//   );
// };

module.exports = ShoppingListController;
