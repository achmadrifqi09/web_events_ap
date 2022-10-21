const {
    getAllEvent,
    createEvent,
    getOneEvent,
    updateEvent,
    deleteEvent,
    updateStatusEvent,
} = require('../../../services/mongoose/events')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const index = async (req, res, next) => {
    try {
        const result = await getAllEvent(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const result = await createEvent(req)
        res.status(StatusCodes.CREATED).json({
            status_code: StatusCodes.CREATED,
            message: ReasonPhrases.CREATED,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneEvent(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateEvent(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteEvent(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const status = async (req, res, next) => {
    try {
        const result = await updateStatusEvent(req)

        res.send(result)
    } catch (error) {
        next(error)
    }
}
module.exports = { index, create, find, update, destroy, status }
