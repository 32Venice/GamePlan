const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://karlsonx:vRfJFH9OhoA7qwrf@cluster0-adsiz.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'GamePlan'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: String,
  createdDate: Number,
  eventHost: {
    user_id: Number,
    user_name: String
  },
  eventDate: Date,
  eventAddress: String,
  eventDescr: String,
  contact: String,
  eventType: String,
  shoppingList: [
    {
      itemName: String,
      itemLikes: Number,
      itemClaimed: Boolean,
      itemClaimedBy: String,
      boozable: Boolean
    }
  ],
  activity: [
    {
      activityName: String,
      activityLikes: Number,
      activityClaimed: Boolean,
      activityClaimedBy: String
    }
  ],
  guests: [
    {
      user_id: Number,
      user_name: String,
      rsvp: Boolean
    }
  ]
});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
