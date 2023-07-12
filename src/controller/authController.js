/** ===========================
 * Dependencies
 ============================= */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res, next) => {
    try {
        const userData = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });
        if (userData && userData._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, userData.password);
            if (isValidPassword) {
                const userObj = {
                    _id: userData._id,
                    email: userData.email,
                };
                // generate token
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY_TIME,
                });
                res.status(200).json({
                    code: 200,
                    message: 'login successfull!!!',
                    result: userData,
                    token,
                });
            } else {
                res.status(400).json({ code: 400, message: 'invalid password!!!' });
            }
        } else {
            res.status(404).json({ code: 404, message: 'login failed!!!' });
        }
    } catch (err) {
        next(err);
    }
};

const registration = async (req, res) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    }

    try {
        const result = await newUser.save();
        res.status(200).json({
            code: 200,
            message: 'User was added successfully!!!',
            result,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: 'Unknown error occured!!!',
            errors: {
                common: {
                    msg: 'Unknown error occured!!!',
                },
            },
        });
    }
};

module.exports = {
    login,
    registration,
};
