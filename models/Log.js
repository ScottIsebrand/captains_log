const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    title: { type: String },
    entry: { type: String },
    shipIsBroken: { type: Boolean },
  },
  { timestamps: true }
);

// Mongoose Model, with functionalities and methods
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
