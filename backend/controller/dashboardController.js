const Achievement = require("../models/achievement");
const Engagement = require("../models/engagement");
const Point = require("../models/point");
const UserBadge = require("../models/userBadge");
const User = require("../models/user");

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    // Fetch user details
    const user = await User.findById(userId).select("-password"); // Exclude password

    // Fetch data from multiple models in parallel
    const [achievements, engagements, points, badges] = await Promise.all([
      Achievement.find({ user: userId }),
      Engagement.find({ user: userId }),
      Point.findOne({ user: userId }),
      UserBadge.find({ user: userId }).populate("badge"),
    ]);

    res.json({
      user,
      achievements,
      engagements,
      points,
      badges,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
