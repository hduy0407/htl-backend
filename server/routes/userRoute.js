const { Router } = require('express');
const  { getUsers, createUser, loginUser, logoutUser, createAdmin } = require('../controllers/userController');
const { auth } = require("../middleware/authMiddleware")

const { forgotPassword, resetPassword } = require("../controllers/getPasswordController")

const router = Router();

//get all users
router.get('/', auth, getUsers);
//create a user
router.post('/', createUser);
//srete admin
router.post('/admin', createAdmin)
//login a user
router.post('/login', loginUser);
//logout user
router.get('/logout', logoutUser)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)

module.exports = router;