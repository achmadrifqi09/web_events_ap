const Talent = require('../../api/v1/talents/model')
const { checkingImage } = require('./images')
const { BadRequestError, NotFoundError } = require('../../error')

const getAllTalent = async (req) => {
    const { keyword } = req.query
    let condition = {}

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } }
    }

    const result = await Talent.find(condition)
        .populate({
            path: 'image',
            select: '_id url_image',
        })
        .select('_id name role image')

    return result
}

const createTalent = async (req) => {
    const { name, role, image } = req.body
    await checkingImage(image)

    const checkingTalent = await Talent.findOne({ name: name })
    if (checkingTalent) throw new BadRequestError('Talent already exist')

    const result = await Talent.create({ name, image, role })
    console.log(result)
    return result
}

const getOneTalent = async (req) => {
    const { id } = req.params

    const result = await Talent.find({ _id: id })
        .populate({ path: 'image', select: '_id url_image' })
        .select('_id name role image')

    if (!result) throw new NotFoundError('Talent not found')
    return result
}

const updateTalent = async (req) => {
    const { id } = req.params
    const { name, role, image } = req.body

    await checkingImage(image)

    const checkingTalent = await Talent.findOne({ name, _id: { $ne: id } })

    if (checkingTalent) throw new BadRequestError('Talent already exist')

    const result = Talent.findOneAndUpdate(
        { _id: id },
        { name, role, image },
        { new: true, runValidator: true }
    )

    if (!result) throw new NotFoundError('Talent not found')

    return result
}

const deleteTalent = async (id) => {
    const result = await Talent.findOneAndDelete({ _id: id })

    if (!result) throw new NotFoundError('Talent not found')

    await result.remove()

    return result
}

const checkingTalent = async (id) => {
    const result = await Talent.findOne({ _id: id })

    if (!result) throw new NotFoundError('Talent not found')

    return result
}

module.exports = { getAllTalent, createTalent, updateTalent, getOneTalent, deleteTalent, checkingTalent }
