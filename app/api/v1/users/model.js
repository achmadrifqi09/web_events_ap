const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bcrypt = require('bcryptjs')

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required'],
            maxLength: 50,
            minLength: 3,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email required'],
        },
        password: {
            type: String,
            required: [true, 'Password required'],
            minLength: 6,
        },
        role: {
            type: String,
            enum: ['admin', 'organizer', 'owner'],
            default: 'admin',
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    const User = this
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatching = await bcrypt.compare(candidatePassword, this.password)
    return isMatching
}

module.exports = model('User', userSchema)
