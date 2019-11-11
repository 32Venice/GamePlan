const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

const shoppingListRouter = require("./routers/ShoppingListRouter");
const eventRouter = require('./routers/EventRouter');
const activitiesRouter = require("./routers/ActivitiesRouter");
const rsvpRouter = require('./routers/RsvpRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  // console.log("In get request");
  res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

app.use('/events', eventRouter);
app.use("/shoppinglist", shoppingListRouter);
app.use("/activities", activitiesRouter);
app.use("/rsvp", rsvpRouter);

/**
 * 404 handler
 */
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
