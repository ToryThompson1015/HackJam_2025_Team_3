const jwt = require('jsonwebtoken');
const User = require("../models/user");

// Register Handler
const register = async (req, res) => {
  try {
    const { firstName, email, password, lastName, location, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = new User({
      firstName,
      email,
      password,
      lastName,
      location,
      role,
    });
    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.log('Register error:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login Handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, // payload
      process.env.JWT_SECRET || 'your_jwt_secret', // secret
      { expiresIn: '1d' } // options
    );

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Handler
const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
