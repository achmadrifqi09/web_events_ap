const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const {
    getAllCategory,
    createCategory,
    findOneCategory,
    updateCategory,
    deleteCategory,
} = require('../../../services/mongoose/categories')

const index = async (req, res, next) => {
    try {
        const result = await getAllCategory(req)
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
        const result = await createCategory(req)
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
        const result = await findOneCategory(req)

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
        const result = await updateCategory(req)
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
        const result = await deleteCategory(req)

        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { index, create, find, update, destroy }
