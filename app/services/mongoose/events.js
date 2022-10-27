const Event = require('../../api/v1/events/model')
const { checkingCategory } = require('./categories')
const { checkingImage } = require('./images')
const { checkingTalent } = require('./talents')
const { BadRequestError, NotFoundError } = require('../../error')

const getAllEvent = async (req) => {
    const { keyword, category, talent, statusEvent } = req.query
    let condition = { organizer: req.user.organizer }

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } }
    }

    if (category) {
        condition = { ...condition, category: category }
    }

    if (talent) {
        condition = { ...condition, talent: talent }
    }

    if (statusEvent) {
        condition = { ...condition, statusEvent: { $regex: statusEvent, $options: 'i' } }
    }

    const result = await Event.find(condition)
        .populate({ path: 'category', select: '_id name' })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id urlImage' },
        })
    return result
}

const createEvent = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
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
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
        organizer: req.user.organizer,
    })

    return result
}

const getOneEvent = async (req) => {
    console.log(req.user.organizer)
    const { id } = req.params
    const result = await Event.findOne({ _id: id, organizer: req.user.organizer })

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
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body

    await checkingImage(image)
    await checkingCategory(category)
    checkingTalent(talent)

    const checkEvent = await Event.findOne({ title, organizer: req.user.organizer, _id: { $ne: id } })

    if (checkEvent) throw new NotFoundError('Event already exist')

    const result = await Event.findOneAndUpdate(
        { _id: id },
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
            organizer: req.user.organizer,
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Event not found')

    return result
}

const deleteEvent = async (req) => {
    const { id } = req.params

    const result = await Event.findOne({ _id: id, organizer: req.user.organizer })

    if (!result) throw new NotFoundError('Event not found')

    result.remove()

    return result
}

const updateStatusEvent = async (req) => {
    const { id } = req.params
    const { statusEvent } = req.body

    const eventData = await Event.findOne({ _id: id })
    if (!eventData) throw new NotFoundError('Event not found')

    if (statusEvent == 'Published' || statusEvent == 'Draft') {
        const result = await Event.findByIdAndUpdate(
            { _id: id },
            { statusEvent: statusEvent },
            { new: true, runValidators: true }
        )

        return result
    } else {
        throw new BadRequestError('Invalid event status')
    }
}

module.exports = { getAllEvent, createEvent, getOneEvent, updateEvent, deleteEvent, updateStatusEvent }
