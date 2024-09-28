const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Booking = require('../models/booking');
const router = express.Router();

const JWT_SECRET = 'xyz';

router.post('/signup', async (req, res) => {
    const { admin_id, user_name, pethouse_name, password, mobile_no, email_id, rating, price, services } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email_id });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({
            admin_id,
            user_name,
            pethouse_name,
            password: hashedPassword,
            mobile_no,
            email_id,
            rating,
            price,
            services
        });

        console.log('Hello!');

        await admin.save();
        res.status(201).json({ message: "Admin created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

//get all pethouse

router.get('/pethouses', async (req, res) => {
    try {
        // Fetch all pet houses from the database
        const petHouses = await Admin.find({}, 'pethouse_name user_name mobile_no email_id'); // Modify fields as needed

        // Return the fetched data
        res.status(200).json({ petHouses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Admin SignIn
router.post('/signin', async (req, res) => {
    const { email_id, password } = req.body;

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email_id });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: "SignIn successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Load all bookings associated with current admin
router.post('/bookings', async (req, res) => {
    try {
        const { adminId } = req.body; // Get adminId from request body

        // Find admin by ID
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Load all bookings associated with the admin's pethouse
        const bookings = await Booking.find({ pethouse_id: admin.pethouse_id });

        res.status(200).json(bookings);  // Send bookings as an array

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.get('/bookings/:adminId', async (req, res) => {
    try {
        
        const { adminId } = req.params; // Get adminId from the URL parameters
        console.log(adminId);
        // Find admin by ID
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Load all bookings associated with the admin's pethouse
        const bookings = await Booking.find({ pethouse_id: admin.pethouse_id });

        res.status(200).json(bookings);  // Send bookings as an array

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get('/me', async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password'); // Exclude password from response
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
