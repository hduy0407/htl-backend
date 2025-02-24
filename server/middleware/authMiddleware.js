const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(400).json({ message: "not authorized" });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(data.id);
        if (!user) {
            return res.status(400).json({ message: "not authorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "no token" });
    }
};

module.exports = { auth };
