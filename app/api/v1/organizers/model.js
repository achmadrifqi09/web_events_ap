const mongoose = require('mongoose')
const { model, Schema } = mongoose

const organizerScheme = Schema(
    {
        organizer: {
            type: String,
            required: [true, 'Organizer required'],
        },
    },
    { timestamps: true }
)

module.exports = model('Organizer', organizerScheme)
