const { createImage } = require('../../../services/mongoose/images')
const Image = require('./model')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
        const result = await createImage(req)

        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { create }
