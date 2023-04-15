// Require modules
require('dotenv').config();
const express = require('express');
const { Logger } = require('mongodb');
const connectToDB = require('./config/captainsdb');
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
  res.send('<h1>Captain Log</h1>');
});

// NEW Route in views/New.jsx, for form
app.get('/logs/new', (req, res) => {
  res.render('New');
});

// Route: CREATE/POST document (ie HTTP verb is POST; action is create; Mongoose func. is .create; CRUD op is Create)
app.post('/logs/', (req, res) => {
  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  res.send(req.body);
});

// Index Route

// Show Route

// Delete Route

// Edit Route

// Update Route

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
