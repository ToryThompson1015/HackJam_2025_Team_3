const Thread = require('../models/thread');

exports.createThread = async (req, res) => {
  try {
    const thread = new Thread({ ...req.body, createdBy: req.user._id });
    await thread.save();
    res.status(201).json(thread);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find().populate('createdBy', 'firstName lastName');
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getThreadById = async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate('createdBy', 'firstName lastName');
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateThread = async (req, res) => {
  try {
    const thread = await Thread.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    res.json(thread);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteThread = async (req, res) => {
  try {
    const thread = await Thread.findByIdAndDelete(req.params.id);
    if (!thread) return res.status(404).json({ error: 'Thread not found' });
    res.json({ message: 'Thread deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
