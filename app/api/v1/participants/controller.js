const {
    singupParticipant,
    signinParticipant,
    activationParticipant,
    getAllEvents,
    getEventDetailById,
    getAllOrder,
    checkoutOrer,
} = require('../../../services/mongoose/participant')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const signup = async (req, res, next) => {
    try {
        const result = await singupParticipant(req)

        res.status(StatusCodes.CREATED).json({
            status_code: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const singin = async (req, res, next) => {
    try {
        const result = await signinParticipant(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            token: result,
        })
    } catch (error) {
        next(error)
    }
}

const activation = async (req, res, next) => {
    try {
        const result = await activationParticipant(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getEvents = async (req, res, next) => {
    try {
        const result = await getAllEvents(req)
        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getEventById = async (req, res, next) => {
    try {
        const result = await getEventDetailById(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const result = await getAllOrder(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const checkout = async (req, res, next) => {
    try {
        const result = await checkoutOrer(req)
        res.status(StatusCodes.CREATED).json({
            status_code: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, activation, getEvents, getEventById, singin, getOrder, checkout }
