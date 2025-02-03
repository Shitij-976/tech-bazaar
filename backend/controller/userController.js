const User = require("../models/user_model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async(req,res) => {
    try {
        // console.log("ok here")
        const users = await User.findOne();
        // console.log(products);
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json("internal server error!",error)
    }
}

// Controller to get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params; // Get the user ID from the request params

        // Find the user by ID in the database
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data (excluding sensitive information like the password)
        res.status(200).json({
            username: user.username,
            email: user.email,
            phone: user.phone,
            message: user.message,
            isAdmin: user.isAdmin,
            isPrime: user.isPrime,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller function for user signup
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { _id: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
         // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7200000
        });
        res.status(201).json({
            message: 'User created successfully!',
            user: {
                _id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin,
                isPrime: savedUser.isPrime,
            },
            token,
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error',error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { _id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7200000 
        });
        res.cookie('user', user, {
            httpOnly: true,
            maxAge: 7200000 
        });

        // Respond with user data
        res.status(200).json({
            message: 'Login successful!',
            user:user,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const forget = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body)

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json("internal server error!", error)
    }
}

const updateAccount = async (req, res) => {
    try {
        const { email, address, password, username } = req.body;
        // console.log(req.body)

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.address = address;
        await user.save();

        res.json({ message: 'Account update successfully', user:user});
    } catch (error) {
        res.status(500).json("internal server error!", error)
    }
}

const createContact = async(req,res) => {
    try {
        const { email, message} = req.body;
        // console.log(req.body)

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.message.push(message);
        await user.save();

        res.json({ message: 'success' });
    } catch (error) {
        res.status(500).json("internal server error!", error)
    }
}


module.exports = { signup, login, getUserById, getUser, forget, createContact, updateAccount};