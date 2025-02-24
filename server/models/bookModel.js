const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"]
        },
        phone: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            index: true 
        },
        timeStart: {
            type: String, 
            required: true
        },
        timeEnd: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            default: "" 
        },
        confirmed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);
