/** ===========================
 * Dependencies
 ============================= */
const uploader = require('../../utils/singleUploader');

function avatarUpload(req, res, next) {
    const upload = uploader(
        'avatars',
        ['image/jpeg', 'image/jpg', 'image/png'],
        3000000, // 3 MB
        'Only .jpg, jpeg or .png format allowed!',
    );

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: err.message,
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = avatarUpload;
