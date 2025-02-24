const { Router } = require('express');
const  { getBookings, createBooking, getBooking, confirmBooking, deleteBooking} = require('../controllers/bookController');
const { auth } = require("../middleware/authMiddleware")

const router = Router();

//get all books
router.get('/', getBookings);
//create a booking
router.post('/', createBooking);
//get single booking
router.get('/booking/:id', getBooking);
//confirm a booking
router.put('/:id', auth, confirmBooking);
//delete a booking
router.delete('/:id', auth, deleteBooking);

module.exports = router;