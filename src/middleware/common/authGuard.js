const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.decoded = decoded;

            next();
        } catch (err) {
            res.status(500).json({
                code: 500,
                message: 'Authentication failure--Token has Expired',
            });
        }
    } else {
        res.status(401).json({
            error: 'Authetication failure!300',
        });
    }
};
module.exports = {
    authGuard,
};
