const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); 
const morgan = require('morgan'); 
require('dotenv').config();
const path = require('path');
const connectDB = require('./server/config/db');
const bookRoute = require('./server/routes/bookRoute');
const userRoute = require('./server/routes/userRoute');
const { errorHandling } = require('./server/middleware/errorHandler');
const cookieParser = require('cookie-parser');
const { auth } = require('./server/middleware/authMiddleware');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow only your frontend domain
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies & auth headers
}));
app.use(helmet()); // Adds secure HTTP headers
app.use(morgan('combined')); // Logs HTTP requests (you can change to 'dev' for more compact logs)
app.use(cookieParser());
app.use(express.json());

// Connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/auth", auth);
app.use('/api/bookings', bookRoute);
app.use('/api/users', userRoute);

// Global error handler
app.use(errorHandling);


// Graceful shutdown handling for production
const shutdown = () => {
    console.log('Shutting down gracefully...');
    server.close(() => {
        console.log('Closed all connections.');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

