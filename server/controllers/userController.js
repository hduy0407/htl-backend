const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const sendConfirmationEmail = require("../function/emailConfirmation")

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-accessKey');

        if (users.length === 0) {
            res.status(404);
            throw new Error('No users found');
        }

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, email, password, accessKey } = req.body;

        // Check for missing fields
        if (!name || !email || !password || !accessKey) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Validate access key BEFORE hashing anything
        if (accessKey !== process.env.ACCESS_KEY) {
            return res.status(403).json({ message: "Invalid access key" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword
        });

        await newUser.save();
        await sendConfirmationEmail(newUser.email, newUser.name);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};




const createAdmin = async (req, res, next) => {
    try {
        const { name, email, password, accessKey } = req.body;

        // Check for missing fields
        if (!name || !email || !password || !accessKey) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Validate access key BEFORE hashing anything
        if (accessKey !== process.env.ACCESS_KEY_ADMIN) {
            return res.status(403).json({ message: "Invalid access key" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin user
        const newUser = new User({ name, email, password: hashedPassword, isAdmin: true });

        await newUser.save();

        return res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        next(error);
    }
};


const loginUser = async (req, res, next) => {
    try {

        if (!process.env.JWT_SECRET) {
            res.status(500)
            throw new Error("JWT_SECRET is missing");
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404)
            throw new Error('User not found');
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.cookie("jwt", token)
        res.status(200).json({ message: 'Login successful', token, isAdmin: user.isAdmin });
    } catch (error) {
        next(error);
    }
};

const logoutUser = async(req, res, next) => {
    res.cookie("jwt", "", {expiresIn: "-1h"})

    return res.json({message: "you have been logged out"})
}

module.exports = { getUsers, createUser, createAdmin, loginUser, logoutUser };