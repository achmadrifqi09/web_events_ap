const { getAllOrders } = require('../../../services/mongoose/orders')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const index = async (req, res, next) => {
   try {
      const result = await getAllOrders(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         result: result,
         total: result.total,
         page: result.pages,
      })
   } catch (error) {
      next()
   }
}

module.exports = { index }
