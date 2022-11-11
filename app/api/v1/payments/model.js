const mongoose = require('mongoose')
const { model, Schema } = mongoose

const paymentSchema = Schema(
    {
        type: {
            type: String,
            required: [true, 'Payment type must be filled in'],
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Image',
            required: true,
        },
        status: {
            type: Boolean,
            enum: [true, false],
            default: true,
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Payment', paymentSchema)
