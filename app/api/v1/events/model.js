const mongoose = require('mongoose')
const { model, Schema } = mongoose

const ticketSchema = Schema({
    type: {
        type: String,
        required: [true, 'Ticket required'],
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    status_ticket_category: {
        type: Boolean,
        enum: [true, false],
        default: true,
    },
    expired: {
        type: Date,
    },
})

const eventSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title required'],
        },
        date: {
            type: Date,
            required: [true, 'Date required'],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, 'Tagline required'],
        },
        keypoint: {
            type: [String],
        },
        vanue_name: {
            type: String,
            required: [true, 'Vanue name required'],
        },
        status_event: {
            type: String,
            enum: ['Draft', 'Published'],
            default: 'Draft',
        },
        tickets: {
            type: [ticketSchema],
            required: [true, 'Ticket required'],
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: 'Image',
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        talent: {
            type: Schema.Types.ObjectId,
            ref: 'Talent',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Event', eventSchema)
