const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

const eventsController = require('./controllers/EventController.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('In get request');
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.post('/events', eventsController.addEvent, (req, res) => {
  console.log('In post request');
  //   res.json(res.locals.events);
  res.status(200).send(res);
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
