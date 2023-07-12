/** ===========================
 * Dependencies
 ============================= */
const { unlink } = require('fs');
const path = require('path');
const User = require('../models/user');

const getAll = async (req, res, next) => {
    try {
        const allUserData = await User.find();
        res.status(200).json({
            code: 200,
            message: 'success!!!',
            result: allUserData,
        });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const userData = await User.find({ _id: req.params.id });
        res.status(200).json({
            code: 200,
            message: 'success!!!',
            result: userData,
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userData = await User.findByIdAndDelete({ _id: req.params.id });
        if (userData.avatar) {
            unlink(path.join(__dirname, `/../public/uploads/avatars/${userData.avatar}`), (err) => {
                if (err) console.log(err);
            });
        }
        res.status(200).json({
            code: 200,
            message: 'user has deleted successfully!!!',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getUser,
    deleteUser,
};
