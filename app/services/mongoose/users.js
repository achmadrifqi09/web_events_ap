const User = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../error')

const createOrganizer = async (req) => {
    const { organizer, name, email, role, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        throw new BadRequestError('Password and password confirmation are not the same')
    }

    const result = await Organizer.create({ organizer })

    const user = await User.create({
        name,
        email,
        role,
        password,
        organizer: result._id,
    })

    delete user._doc.password
    return user
}

module.exports = { createOrganizer }
