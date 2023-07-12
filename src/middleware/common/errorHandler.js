/**
 * Title: Chat App
 * Description: Error Handler
 * Author: Koushik
 * Date: 12-07-22
 */

/** ===========================
 * Dependencies
 ============================= */

// 404 NOT FOUND
const notFoundHandler = (req, res, next) => {
    res.status(404).json({ code: 404, message: 'request not found!!!' });
};

// DEFAULT ERROR HANDLER

const errorHandler = (err, req, res, next) => {
    console.log('ERR >', err);
    if (process.env.NODE_ENV === 'staging') {
        res.status(err.status || 500).json({ code: 500, message: err.message });
    } else {
        res.status(err.status || 500).json({ code: 500, message: 'server side error!!!' });
    }
};

module.exports = {
    notFoundHandler,
    errorHandler,
};
