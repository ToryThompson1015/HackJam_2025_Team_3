const Engagement = require('../models/engagement');

exports.createEngagement = async (req, res) => {
  try {
    const engagement = new Engagement({ ...req.body, user: req.user._id });
    await engagement.save();
    res.status(201).json(engagement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEngagementsByUser = async (req, res) => {
  try {
    const engagements = await Engagement.find({ user: req.user._id });
    res.json(engagements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEngagement = async (req, res) => {
  try {
    const engagement = await Engagement.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!engagement) return res.status(404).json({ error: 'Not found' });
    res.json(engagement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEngagement = async (req, res) => {
  try {
    const engagement = await Engagement.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!engagement) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 