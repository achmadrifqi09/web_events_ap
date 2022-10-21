const { signin } = require('../../../services/mongoose/auth')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const signinCMS = async (req, res, next) => {
    try {
        const result = await signin(req)

        res.status(StatusCodes.CREATED).json({
            status_code: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            token: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { signinCMS }
