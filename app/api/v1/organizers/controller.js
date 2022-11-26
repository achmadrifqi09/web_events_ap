const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { createOrganizer, createUser, getAllUser } = require('../../../services/mongoose/users')

const createCMSOrganizer = async (req, res, next) => {
   try {
      const result = await createOrganizer(req)

      res.status(StatusCodes.CREATED).json({
         status_code: StatusCodes.CREATED,
         message: ReasonPhrases.CREATED,
         result: result,
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
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

const getAllCMSUser = async (req, res, next) => {
   try {
      const result = await getAllUser(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
      })
   } catch (error) {
      next()
   }
}

module.exports = { createCMSOrganizer, createCMSUser, getAllCMSUser }
