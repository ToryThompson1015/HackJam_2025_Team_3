const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['mentorship', 'peer_group', 'social_event'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Engagement', engagementSchema); 