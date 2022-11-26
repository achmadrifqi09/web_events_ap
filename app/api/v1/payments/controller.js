const {
   getAllPayment,
   getOnePayement,
   createPayment,
   updatePayment,
   deletePayment,
} = require('../../../services/mongoose/payments')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const create = async (req, res, next) => {
   try {
      const result = await createPayment(req)
      res.status(StatusCodes.CREATED).json({
         status_code: StatusCodes.CREATED,
         message: ReasonPhrases.CREATED,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const index = async (req, res, next) => {
   try {
      const result = await getAllPayment(req)
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
      const result = await getOnePayement(req)
      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const update = async (req, res, next) => {
   try {
      const result = await updatePayment(req)
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
      const result = await deletePayment(req)
      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   create,
   index,
   find,
   update,
   destroy,
}
