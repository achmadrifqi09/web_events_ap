const Event = require('../../api/v1/events/model')
const { checkingCategory } = require('./categories')
const { checkingImage } = require('./images')
const { checkingTalent } = require('./talents')
const { NotFoundError, BadRequestError } = require('../../error')

const getAllEvent = async (req) => {
    const { keyword, category, talent } = req.query
    let condition = {}

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } }
    }

    if (category) {
        condition = { ...condition, category: { $regex: category, $options: 'i' } }
    }

    if (talent) {
        condition = { ...condition, talent: { $regex: talent, $options: 'i' } }
    }

    const result = await Event.find(condition)
        .populate({ path: 'category', select: '_id name' })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id url_image' },
        })
    return result
}

const createEvent = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        vanue_name,
        keypoint,
        status_event,
        tickets,
        image,
        category,
        talent,
    } = req.body

    await checkingImage(image)
    await checkingCategory(category)
    await checkingTalent(talent)

    const checkEvent = await Event.findOne({ title: title })

    if (checkEvent) throw new BadRequestError('Event already exist')

    const result = await Event.create({
        title,
        date,
        about,
        tagline,
        vanue_name,
        keypoint,
        status_event,
        tickets,
        image,
        category,
        talent,
    })

    return result
}

const getOneEvent = async (req) => {
    const { id } = req.params
    const result = await Event.findOne({ _id: id })

    if (!result) throw new NotFoundError('Event not found')

    return result
}

const updateEvent = async (req) => {
    const { id } = req.params
    const {
        title,
        date,
        about,
        tagline,
        vanue_name,
        keypoint,
        status_event,
        tickets,
        image,
        category,
        talent,
    } = req.body

    await checkingImage(image)
    await checkingCategory(category)
    checkingTalent(talent)

    const checkEvent = await Event.findOne({ title, _id: { $ne: id } })

    if (checkEvent) throw new NotFoundError('Event already exist')

    const result = await Event.findOneAndUpdate(
        { _id: id },
        {
            title,
            date,
            about,
            tagline,
            vanue_name,
            keypoint,
            status_event,
            tickets,
            image,
            category,
            talent,
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Event not found')

    return result
}

const deleteEvent = async (req) => {
    const { id } = req.params

    const result = await Event.findOne({ _id: id })

    if (!result) throw new NotFoundError('Event not found')

    result.remove()

    return result
}

module.exports = { getAllEvent, createEvent, getOneEvent, updateEvent, deleteEvent }
