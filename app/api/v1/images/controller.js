const { createImage } = require('../../../services/mongoose/images')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const create = async (req, res, next) => {
   try {
      const result = await createImage(req)

      res.status(StatusCodes.CREATED).json({
         status_code: StatusCodes.CREATED,
         message: ReasonPhrases.CREATED,
         result: result,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = { create }
