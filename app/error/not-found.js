const { StatusCodes } = require('http-status-codes')
const { NotFound } = require('.')
const CustomAPIError = require('./custom-api-error')

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError
