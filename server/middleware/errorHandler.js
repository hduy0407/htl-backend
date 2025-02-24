const errorHandling = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    return res.status(statusCode).json({ message: err.message});
}

module.exports = { errorHandling };