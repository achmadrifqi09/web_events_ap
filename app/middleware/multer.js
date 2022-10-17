const multer = require('multer')
const { StatusCodes } = require('http-status-codes')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb({ statusCode: StatusCodes.BAD_REQUEST, message: 'Unsupported file format' }, false)
    }
}

const uploadImageMiddleware = multer({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: fileFilter,
})

module.exports = uploadImageMiddleware
