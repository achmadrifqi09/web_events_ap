const mongoose = require('mongoose')
const { model, Schema } = mongoose

let categorySchema = Schema(
    {
        name: {
            type: String,
            minLength: [3, 'Minimum length 3 characters'],
            maxLength: [20, 'Miximum length 20 characters'],
            required: [true, 'Category name is required'],
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Category', categorySchema)
