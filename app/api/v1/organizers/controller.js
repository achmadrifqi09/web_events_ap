const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { createOrganizer } = require('../../../services/mongoose/users')

const create = async (req, res, next) => {
    try {
        const result = await createOrganizer(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { create }
