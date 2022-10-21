const { UnauthenticatedError, UnauthorizedError } = require('../error')
const { isTokenValid } = require('../utils/jsonwebtoken')

const authenticateUser = (req, res, next) => {
    try {
        let token
        const authHeader = req.headers.authorization

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        if (!token) {
            throw new UnauthenticatedError('Authentication invalid')
        }

        const payload = isTokenValid({ token })

        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.userId,
        }

        next()
    } catch (error) {
        next(error)
    }
}

const authorizationRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route')
        }
        next()
    }
}

module.exports = { authenticateUser, authorizationRoles }
