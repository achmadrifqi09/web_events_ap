const Talent = require('../../api/v1/talents/model')
const { checkingImage } = require('./images')
const { BadRequestError, NotFoundError } = require('../../error')

const getAllTalent = async (req) => {
    const { keyword } = req.query
    let condition = { organizer: req.user.organizer }

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } }
    }

    const result = await Talent.find(condition)
        .populate({
            path: 'image',
            select: '_id urlImage',
        })
        .select('_id name role image')

    return result
}

const createTalent = async (req) => {
    const { name, role, image } = req.body
    await checkingImage(image)

    const checkingTalent = await Talent.findOne({ name: name, organizer: req.user.organizer })
    if (checkingTalent) throw new BadRequestError('Talent already exist')

    const result = await Talent.create({ name, image, role, organizer: req.user.organizer })
    return result
}

const getOneTalent = async (req) => {
    const { id } = req.params

    const result = await Talent.find({ _id: id, organizer: req.user.organizer })
        .populate({ path: 'image', select: '_id urlImage' })
        .select('_id name role image')

    if (!result) throw new NotFoundError(`No talent has an id : ${id}`)
    return result
}

const updateTalent = async (req) => {
    const { id } = req.params
    const { name, role, image } = req.body

    await checkingImage(image)

    const checkingTalent = await Talent.findOne({ name, organizer: req.user.organizer, _id: { $ne: id } })

    if (checkingTalent) throw new BadRequestError('Talent already exist')

    const result = Talent.findOneAndUpdate(
        { _id: id },
        { name, role, image, organizer: req.user.organizer },
        { new: true, runValidator: true }
    )

    if (!result) throw new NotFoundError(`No talent has an id : ${id}`)

    return result
}

const deleteTalent = async (req) => {
    const { id } = req.params
    const result = await Talent.findOne({ _id: id, organizer: req.user.organizer })

    if (!result) throw new NotFoundError(`No talent has an id : ${id}`)

    await result.remove()

    return result
}

const checkingTalent = async (id) => {
    const result = await Talent.findOne({ _id: id })

    if (!result) throw new NotFoundError(`No talent has an id : ${id}`)

    return result
}

module.exports = { getAllTalent, createTalent, updateTalent, getOneTalent, deleteTalent, checkingTalent }
