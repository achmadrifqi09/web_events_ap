const { StatusCodes } = require('http-status-codes')

const handleErrorMiddleware = (error, req, res, next) => {

    let customError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'Something went wrong try again later',
    }

    if (error.name === 'ValidationError') {
        customError.message = Object.values(error.errors)
            .map((item) => item.message)
            .join(', ')
        customError.statusCode = 400
    }

    if (error.code && error.code === 11000) {
        customError.message = `Duplicate vale entered for ${Object.keys(
            error.keyValue
        )} field please choose another value`
        customError.statusCode = 400
    }

    if (error.name === 'CastError') {
        customError.message = `No category has an id: : ${error.value}`
        customError.statusCode = 404
    }

    return res
        .status(customError.statusCode)
        .json({ status: customError.statusCode, message: customError.message })
}

module.exports = handleErrorMiddleware
