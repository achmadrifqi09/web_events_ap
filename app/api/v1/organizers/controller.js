const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { createOrganizer, createUser } = require('../../../services/mongoose/users')

const createCMSOrganizer = async (req, res, next) => {
    try {
        const result = await createOrganizer(req)

        res.status(StatusCodes.CREATED).json({
            status_code: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const createCMSUser = async (req, res, next) => {
    try {
        const result = await createUser(req)
        res.status(StatusCodes.CREATED).json({
            status_code: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { createCMSOrganizer, createCMSUser }
