const Booking = require('../models/bookModel');
const { sendBookingConfirmationEmail, sendDoubleBookingConfirmationEmail } = require("../function/emailConfirmation");

const getBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({}) || []; 

        if (!Array.isArray(bookings)) {
            return res.status(500).json({ error: "Unexpected response format" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        next(error);
    }
};
const createBooking = async (req, res, next) => {
    try {
        const { name, email, phone, date, timeStart, timeEnd } = req.body;

        if (!name || !email || !phone || !date || !timeStart || !timeEnd) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        // Validate email format
        const emailRegex = /.+\@.+\..+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const newBooking = new Booking({ name, email, phone, date, timeStart, timeEnd });
        await newBooking.save();

        await sendBookingConfirmationEmail(email, name, { date, timeStart, timeEnd, phone });
        res.status(201).json({ message: "Booking created successfully" });
    } catch (error) {
        next(error);
    }
};

const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        next(error);
    }
};


const confirmBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            res.status(404);
            throw new Error('Booking not found');
        }

        booking.confirmed = true;
        await booking.save();

        const { email, name, date, timeStart, timeEnd, phone } = booking;
        
        if (!email) {
            console.error("Error: No email found for this booking.");
            return res.status(400).json({ message: "User email is required to send confirmation." });
        }


        await sendDoubleBookingConfirmationEmail(email, name, { date, timeStart, timeEnd, phone });

        res.json({ message: 'Booking confirmed and email sent' });
    } catch (error) {
        next(error);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            res.status(404);
            throw new Error('Booking not found');
        }

        res.json({ message: 'Booking deleted'});
    } catch (error) {
        next(error);
    }
}

module.exports = { getBookings, getBooking, createBooking, confirmBooking, deleteBooking };