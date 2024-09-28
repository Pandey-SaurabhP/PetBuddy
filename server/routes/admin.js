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
router.get('/bookings', async (req, res) => {
    try {
        // Assuming that the authMiddleware attaches the adminId to the request object
        const adminId = req.adminId;

        // Find admin by ID
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Load all bookings associated with the admin's pethouse
        const bookings = await Booking.find({ pethouse_id: admin.admin_id });
        
        res.status(200).json({ bookings });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
