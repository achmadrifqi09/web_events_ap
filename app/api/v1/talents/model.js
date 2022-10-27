const mongoose = require('mongoose')
const { model, Schema } = mongoose

const talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },

        role: {
            type: String,
            default: 'null',
        },

        image: {
            type: Schema.Types.ObjectId,
            ref: 'Image',
            required: true,
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Talent', talentSchema)
