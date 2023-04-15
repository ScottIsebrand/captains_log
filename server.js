// Require modules
require('dotenv').config();
const express = require('express');
const { Logger } = require('mongodb');
const connectToDB = require('./config/captainsdb');
const Log = require('./models/Log');
// Create the Express app
const app = express();

// === Configure the app (settings); TEMPLATE ENGINES
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

// === MIDDLEWARE (app.use); parsess the data from the request; makes data accessible
app.use(express.urlencoded({ extended: false }));
// == Middleware body-parser
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// === ROUTES
// Route: Homepage message
app.get('/', function (req, res) {
  res.send("<h1>Captain's Log</h1>");
});

// Route: NEW (location views/New.jsx), for form; HTTP verb is GET
app.get('/logs/new', (req, res) => {
  res.render('New');
});

// Route: POST/CREATE document (ie HTTP verb is POST; action is create; Mongoose func. is .create; CRUD op is Create)
app.post('/logs', (req, res) => {
  console.log(req.body);
  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.create(req.body, (error, createdLog) => {
    res.redirect('/logs');
  });
  //   res.send(req.body);
});

// Route: INDEX (ie HTTP verb is GET; action is index; Mongoose func. is .find; CRUD op is Read)
app.get('/logs', (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render('Index', { logs: allLogs });
  });
});

// Route: SHOW
app.get('/logs/:id', (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render('Show', { log: foundLog });
  });
});

// Route: DELETE

// Route: EDIT

// Route: UPDATE

// Route: render 404 page
app.get('*', (req, res) => {
  // res.redirect('/fruits');
  res.render('404');
});

//* LISTENING at port 3000
app.listen(3000, () => {
  console.log('Server is up; listening at port 3000.');
  connectToDB();
});
