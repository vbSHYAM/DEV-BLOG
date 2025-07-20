const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register User
exports.registerUser = async (req, res) => {
    try {
        const  { username, email, password } = req.body;

        // check if user already exist
        const userExist = await User.findOne({ email});
        if (userExist) return res.status(400).json({
            message: 'Email already exists'
        })

        // create user
        const user = await User.create({ username, email, password});
        // 201 - req successfully created
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Generate JWT token
        });
    } catch (err) {
        // 500 - internal server error
        res.status(500).json({ message: err.message})
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check for valid email
        const user = await User.findOne({ email});
        if (!user) return res.status(400).json({ message: 'Invalid email'});

        // check for valid email
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password'});

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id), // Generate JWT token
        });
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
};