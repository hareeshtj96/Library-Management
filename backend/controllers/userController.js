const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Register user
// POST /api/users/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // if user exists
        const userExists = await User.findOne({ email: email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


// Login User
// POST /api/users/login
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json({ message: "Invalid email or passoword" })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// User profile
// GET /api/users/profile 
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { registerUser, loginuser, getProfile };