const Point = require('../models/point');
const UserBadge = require('../models/userBadge');
const Badge = require('../models/badge');
const Task = require('../models/task');
const UserTask = require('../models/userTask');

// Points
exports.getUserPoints = async (req, res) => {
  try {
    let points = await Point.findOne({ user: req.user._id });
    if (!points) points = await Point.create({ user: req.user._id });
    res.json(points);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addPoints = async (req, res) => {
  try {
    const { amount } = req.body;
    let points = await Point.findOne({ user: req.user._id });
    if (!points) points = await Point.create({ user: req.user._id });
    points.totalPoints += amount;
    await points.save();
    res.json(points);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Daily login bonus
exports.dailyLoginBonus = async (req, res) => {
  try {
    let points = await Point.findOne({ user: req.user._id });
    const today = new Date();
    if (!points) {
      points = await Point.create({ user: req.user._id, lastLogin: today, streak: 1, totalPoints: 10 });
      return res.json({ message: 'First login bonus!', points });
    }
    const lastLogin = points.lastLogin ? new Date(points.lastLogin) : null;
    if (lastLogin && lastLogin.toDateString() === today.toDateString()) {
      return res.status(400).json({ error: 'Already claimed today' });
    }
    // Check for streak
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (lastLogin && lastLogin.toDateString() === yesterday.toDateString()) {
      points.streak += 1;
    } else {
      points.streak = 1;
    }
    points.lastLogin = today;
    points.totalPoints += 10; // daily bonus
    await points.save();
    res.json({ message: 'Daily login bonus awarded', points });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Badges
exports.getUserBadges = async (req, res) => {
  try {
    const userBadges = await UserBadge.find({ user: req.user._id }).populate('badge');
    res.json(userBadges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.awardBadge = async (req, res) => {
  try {
    const { badgeId } = req.body;
    const alreadyAwarded = await UserBadge.findOne({ user: req.user._id, badge: badgeId });
    if (alreadyAwarded) return res.status(400).json({ error: 'Badge already awarded' });
    const badge = await Badge.findById(badgeId);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    const userBadge = await UserBadge.create({ user: req.user._id, badge: badgeId });
    res.json(userBadge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Tasks
exports.getUserTasks = async (req, res) => {
  try {
    const userTasks = await UserTask.find({ user: req.user._id }).populate('task');
    res.json(userTasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const { userTaskId } = req.body;
    const userTask = await UserTask.findOne({ _id: userTaskId, user: req.user._id });
    if (!userTask) return res.status(404).json({ error: 'UserTask not found' });
    if (userTask.status === 'completed') return res.status(400).json({ error: 'Task already completed' });
    userTask.status = 'completed';
    userTask.completedAt = new Date();
    await userTask.save();
    // Optionally, award points for task completion
    let points = await Point.findOne({ user: req.user._id });
    if (!points) points = await Point.create({ user: req.user._id });
    points.totalPoints += 5;
    await points.save();
    res.json({ message: 'Task completed', userTask, points });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 