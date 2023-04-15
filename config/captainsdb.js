const mongoose = require('mongoose');
// Global configurations
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

module.exports = function () {
  // Connect to MongoDB
  mongoose.set('strictQuery', true);
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // A disconnect.... Will wait 5 sec and then call db.close
  //   setTimeout(() => {
  //     db.close();
  //   }, 5000);

  // listen error, success and close events (ie define callback functions for events) on connection (.on)
  db.on('error', (error) => console.error(error));
  db.on('open', () => console.log('Connected to MongoDB for captainsdb'));
  db.on('close', () => console.log('Mongo (captainsdb) disconnected'));
};
