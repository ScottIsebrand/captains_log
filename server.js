// Require modules
require('dotenv').config();
// Require Express
const express = require('express');
// const { Logger } = require('mongodb');
const connectToDB = require('./config/captainsdb');
const methodOverride = require('method-override');

const Log = require('./models/Log');
// Create the Express app
const app = express();

// === Configure the app (settings); TEMPLATE ENGINES
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

// === MIDDLEWARE
// == Middleware (app.use): parsess the data from the request; makes data accessible
app.use(express.urlencoded({ extended: false }));
// == Middleware (app.use): override using a query value so that when we make request from form
app.use(methodOverride('_method'));
// == Middleware (app.use): body-parser
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// === ROUTES
// Route: Homepage message
app.get('/', function (req, res) {
  res.render('Home');
});

// Route: NEW (form), (location views/New.jsx), for form; HTTP verb is .get; action is new)
app.get('/logs/new', (req, res) => {
  res.render('New');
});

// Route: POST/CREATE document (ie HTTP verb is .post; action is create; Mongoose func. is .create; CRUD op is Create)
app.post('/logs', (req, res) => {
  // console.log(req.body);

  if (req.body.shipIsBroken === 'on') {
    /// req.body = {title: string, entry: string, shipIsBroken: 'on'(a string)}
    req.body.shipIsBroken = true;
    /// req.body = {title: string, entry: string, shipIsBroken: true (Boolean)}
  } else {
    /// req.body = {title: string, entry: string}
    req.body.shipIsBroken = false;
    /// req.body = {title: string, entry: string, shipIsBroken: false (Boolean)}
  }
  Log.create(req.body, (error, createdLog) => {
    res.redirect('/logs');
  });
  //   res.send(req.body);
});

// Route: INDEX (ie HTTP verb is .get; action is index; Mongoose func. is .find; CRUD op is Read)
app.get('/logs', (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render('Index', { logs: allLogs });
  });
});

// SHOW ROUTE to return/send back a single log entry
app.get('/logs/:id', (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render('Show', { log: foundLog }); // Show.jsx will have { log: foundLog } as props
  });
});

// Route: EDIT (ie HTTP verb is .get; action is edit; Mongoose Model func. is .findByIdAndUpdate)
app.get('/logs/:id/edit', (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    if (!error) {
      res.render('Edit', { log: foundLog });
    } else {
      res.send({ msg: error.message });
    }
  });
});

// Handle the Edit form data: UPDATE (ie HTTP verb is .put; action is update; Mongoose Model func. is .update)
app.put('/logs/:id', (req, res) => {
  if (req.body.shipIsBroken === 'on') {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.findByIdAndUpdate(req.params.id, req.body, (error, updatedLog) => {
    res.redirect('/logs');
  });
});

// Route: DELETE (ie HTTP verb is .delete; action is destroy; Mongoose Model func. is .findByIdAndDelete)
app.delete('/logs/:id', (req, res) => {
  Log.findByIdAndRemove(req.params.id, (error, deletedLog) => {
    res.redirect('/logs');
  });
});

// Route: render 404 page
app.get('*', (req, res) => {
  res.render('404');
});

//* LISTENING at port 3000
app.listen(3000, () => {
  console.log('Server is up; listening at port 3000.');
  connectToDB();
});
