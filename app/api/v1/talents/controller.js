const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const {
   getAllTalent,
   createTalent,
   getOneTalent,
   updateTalent,
   deleteTalent,
} = require('../../../services/mongoose/talents')

const index = async (req, res, next) => {
   try {
      const result = await getAllTalent(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const create = async (req, res, next) => {
   try {
      const result = await createTalent(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const find = async (req, res, next) => {
   try {
      const result = await getOneTalent(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const update = async (req, res, next) => {
   try {
      const result = await updateTalent(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const destroy = async (req, res, next) => {
   try {
      const result = await deleteTalent(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = { index, create, find, update, destroy }
