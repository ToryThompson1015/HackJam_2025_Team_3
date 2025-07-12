const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  totalPoints: { type: Number, default: 0 },
  lastLogin: { type: Date },
  streak: { type: Number, default: 0 }
});

module.exports = mongoose.model('Point', pointSchema); 