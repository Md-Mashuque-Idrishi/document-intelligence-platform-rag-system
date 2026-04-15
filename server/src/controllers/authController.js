const User = require("../models/User");
const jwt = require("jsonwebtoken");

//  Register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password });

    res.json({
      message: "User registered successfully",
      user,
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};

//  Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    res.status(500).json(err.message);
  }
};