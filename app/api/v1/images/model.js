const mongoose = require('mongoose')
const { model, Schema } = mongoose

let imageSchema = Schema(
    {
        urlImage: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = model('Image', imageSchema)
