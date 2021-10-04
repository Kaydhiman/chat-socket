const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  token: { type: String, unique: true, required: true },
  expiry: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BlockedToken', schema);
