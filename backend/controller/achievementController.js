const Achievement = require('../models/achievement');

exports.createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement({ ...req.body, user: req.user._id });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAchievementsByUser = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user._id });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!achievement) return res.status(404).json({ error: 'Not found' });
    res.json(achievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!achievement) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 