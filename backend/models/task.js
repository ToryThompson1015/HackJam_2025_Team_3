const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  type: { type: String, enum: ['daily', 'weekly'], required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Task', taskSchema); 