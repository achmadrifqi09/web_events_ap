const { signin } = require('../../../services/mongoose/auth')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const signinCMS = async (req, res, next) => {
   try {
      const result = await signin(req)

      res.status(StatusCodes.OK).json({
         status_code: StatusCodes.OK,
         message: ReasonPhrases.OK,
         token: result.token,
         role: result.role,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = { signinCMS }
