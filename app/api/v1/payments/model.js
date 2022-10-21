const mongoose = require('mongoose')
const { model, Schema } = mongoose

const paymentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Payment name required'],
        },
        status: {
            type: Boolean,
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: 'Image',
        },
    },
    { timestamps: true }
)
