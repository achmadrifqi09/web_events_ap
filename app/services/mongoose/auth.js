const User = require('../../api/v1/users/model')
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../error')
const { createJWT, createUserToken } = require('../../utils')

const signin = async (req) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const result = await User.findOne({ email: email })
    if (!result) {
        throw new UnauthorizedError('Invalid credential')
    }

    const isPasswordCorrect = await result.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid creadential')
    }

    const token = createJWT({ payload: createUserToken(result) })

    return token
}

module.exports = {signin}
