// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const secretKey = 'xyz'; // Secret key for JWT

app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017/fureverhub';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// const messageSchema = new mongoose.Schema({
//     room: String,
//     author: String,
//     message: String,
//     time: String
// });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Users = mongoose.model('Users', userSchema);

const centerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // You can add more fields as needed
});

const Center = mongoose.model('Center', centerSchema);

app.get('/api/centers', async (req, res) => {
    const { location } = req.query;

    try {
        // Query centers based on the provided location using substring match and case insensitivity
        const centers = await Center.find({ name: { $regex: new RegExp(location, 'i') } });

        if (!centers || centers.length === 0) {
            return res.status(404).json({ message: 'No centers found for the provided location' });
        }

        res.json(centers);
    } catch (error) {
        console.error('Error loading centers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const newUser = new Users({ username, password });
        await newUser.save();

        console.log('User signed up:', newUser);
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Signup failed:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username and password in MongoDB
        const user = await Users.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '5m' });
        console.log('Token : ', token);
        res.json({ token });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

app.post('/api/user', (req, res) => {
    const { token } = req.body;

    try {
        // Verify and decode JWT token
        const decoded = jwt.verify(token, secretKey);
        // Check if token is expired
        if (Date.now() >= decoded.exp * 1000) {
            throw new Error('Token expired');
        }
        // Send back user information (username in this case)
        res.json({ username: decoded.username });
    } catch (error) {
        // console.error('Error decoding token:', error);
        res.json({ username: 'Expired' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
