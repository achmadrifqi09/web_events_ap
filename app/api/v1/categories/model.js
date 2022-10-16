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
    },
    { timestamps: true }
)

module.exports = model('Category', categorySchema)
