// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

const secretKey = 'xyz'; // Secret key for JWT

app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb+srv://pandeygrocks:Saurabh04@maindb.ijbfr2l.mongodb.net/petbuddy?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    password: {
        type: String
    },
    user_name: {
        type: String
    },
    user_address: {
        type: String
    },
    mobile_number: {
        type: String
    }
});
const Users = mongoose.model('Users', userSchema);

const centerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    address: {
        type: String
    },
    rating: {
        type: String
    },
    price: {
        type: String
    },
});
const Center = mongoose.model('Center', centerSchema);

const petSchema = new mongoose.Schema({
    pet_id: {
        type: String
    },
    pet_name: {
        type: String
    },
    pet_type: {
        type: String
    },
    pet_breed: {
        type: String
    },
    pet_image: {
        type: String
    }
});
const Pet = mongoose.model('Pet', petSchema);

const bookingSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    pet_name: {
        type: String
    },
    datetime_of_booking: {
        type: Date
    },
    type: {
        type: String
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    payment_id: {
        type: String
    }
});
const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/bookings', async (req, res) => {
    const { username } = req.body;
    console.log(req.body);

    try {
        // Find all bookings associated with the provided username
        const bookings = await Booking.find({ user_name: username });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the provided username' });
        }

        res.json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/bookings/add', async (req, res) => {
    const { user_name, pet_name, datetime_of_booking, type, time_slot } = req.body;

    try {
        // Generate payment ID (you can use any method to generate a unique ID)
        const payment_id = generatePaymentID();

        // Create a new booking record
        const newBooking = new Booking({
            user_name,
            pet_name,
            datetime_of_booking,
            type,
            time_slot,
            payment_id
        });

        // Save the booking record to the database
        const savedBooking = await newBooking.save();

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const generatePaymentID = () => {
    // Generate a random alphanumeric string (you can use any method to generate a unique ID)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let paymentID = '';
    for (let i = 0; i < 10; i++) {
        paymentID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return paymentID;
};


app.post('/api/pets', async (req, res) => {
    const petName = req.body.pet_name;
    console.log(petName);

    try {
        // Find pet by pet_name
        const pet = await Pet.findOne({ pet_name: petName });

        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.json(pet);
    } catch (error) {
        console.error('Error retrieving pet information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/centers', async (req, res) => {
    try {
        const centers = await Center.find({});

        if (!centers || centers.length === 0) {
            return res.status(404).json({ message: 'No centers found' });
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
        const existingUser = await Users.findOne({ user_name: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Generate a random user_id
        const user_id = uuid.v4();

        // Hardcoded user_address and mobile_number
        const user_address = "123 Main Street, Cityville, USA";
        const mobile_number = "123-456-7890";

        // Create new user
        const newUser = new Users({ user_id, user_name: username, password, user_address, mobile_number });
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
    const { user_name: username, password } = req.body;
    console.log(req.body);

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
