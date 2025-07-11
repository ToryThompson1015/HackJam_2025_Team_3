const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String },
  criteria: { type: String }
});

module.exports = mongoose.model('Badge', badgeSchema); 