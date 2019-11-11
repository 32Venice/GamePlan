const Event = require("../models/EventModel");

const ShoppingListController = {};

ShoppingListController.addItem = (req, res, next) => {
  console.log("in ShoppingListController.addItem");
  const { item, event_id } = req.body;
  console.log(req.body);

  item["itemLikes"] = 0;
  item["itemClaimed"] = false;
  console.log("ITEM CLAIMEDBY", item.itemClaimedBy);
  if (!item.itemClaimedBy) item["itemClaimedBy"] = "";

  console.log(item);
  Event.findOneAndUpdate(
    { _id: event_id },
    { $push: { shoppingList: item } },
      {new: true},
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
      {new: true},
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

ShoppingListController.updateItem = (req, res, next) => {
  console.log("in ShoppingListController.updateItem");
  const { event_id, item } = req.body;

  const tempItem = {};
  tempItem["itemName"] = item.itemName;
  tempItem["itemClaimedBy"] = "";
  tempItem["itemClaimed"] = false;

  console.log("tempItem ------->", tempItem);
  Event.findOneAndUpdate(
    { _id: event_id },
    { $pull: { shoppingList: tempItem } },
      {new: true},
    (err, data) => {
      if (err) {
        res.locals.error = err;
        res.locals.success = false;
        return next();
      }
      Event.findOneAndUpdate(
        { _id: event_id },
        { $push: { shoppingList: item } },
          {new: true},
        (err, data) => {
          if (err) {
            res.locals.error = err;
            res.locals.success = false;
            return next();
          }
          res.locals.items = data.shoppingList;
          res.locals.success = true;
          return next();
        }
      );
    }
  );
  console.log("item ------->", item);

  // .findOneAndUpdate(
  //   { itemName: item },
  //   { $set: { itemClaimedBy: claimedBy } },
  //   (err, data) => {
  //     console.log("MY DATA ---> ", data);
  //     if (err) {
  //       console.log("ERROR ---> ", err);
  //       res.locals.error = err;
  //       res.locals.success = false;
  //       return next();
  //     }
  //     console.log("ITS NOT IN ERROR ");
  //     res.locals.items = data;
  //     res.locals.success = true;
  //     return next();
  //   }
  // );
};

module.exports = ShoppingListController;
