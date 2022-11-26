const Payment = require('../../api/v1/payments/model')
const { checkingImage } = require('./images')
const { NotFoundError, BadRequestError } = require('../../error')

const getAllPayment = async (req) => {
    let condition = { organizer: req.user.organizer }

    const result = await Payment.find(condition)
        .populate({ path: 'image', select: '_id urlImage' })
        .select('_id type status image')

    return result
}

const createPayment = async (req) => {
    const { type, image } = req.body

    await checkingImage(image)
    const checkingPayment = await Payment.findOne({ type, organizer: req.user.organizer })

    if (checkingPayment) throw new BadRequestError('Payment already axist')

    const result = await Payment.create({
        image,
        type,
        organizer: req.user.organizer,
    })

    return result
}

const getOnePayement = async (req) => {
    const { id } = req.params

    const result = await Payment.findOne({ _id: id, organizer: req.user.organizer })
        .populate({
            path: 'image',
            select: '_id urlImage',
        })
        .select('_id type status image')

    if (!result) {
        throw new NotFoundError(`No payment has an id: : ${id}`)
    }

    return result
}

const updatePayment = async (req) => {
    const { id } = req.params
    const { type, image } = req.body

    await checkingImage(image)

    const checkingPayment = await Payment.findOne({
        type,
        organizer: req.user.organizer,
        _id: { $ne: id },
    })

    if (checkingPayment) throw new BadRequestError('Payment already axist')

    const result = await Payment.findOneAndUpdate(
        { _id: id },
        { type, image, organizer: req.user.organizer },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError(`No payment has an id : ${id}`)

    return result
}

const deletePayment = async (req) => {
    const { id } = req.params

    const result = await Payment.findOneAndDelete({ _id: id, organizer: req.user.organizer })

    if (!result) throw new NotFoundError(`No payment has an id : ${id}`)

    await result.remove()

    return result
}

const checkingPayment = async (id) => {
    const result = await Payment.findOne({ _id: id })

    if (!result) throw new NotFoundError(`No payment has an id : ${id}`)

    return result
}

const updatePaymentStatus = async (req) => {
    const { id } = req.params
    const { status } = req.body

    const result = await Payment.findOneAndUpdate(
        { _id: id },
        { status },
        { runValidators: true, new: true }
    ).select('_id type status image')

    if (!result) throw new NotFoundError(`No payment has an id : ${id}`)

    return result
}

module.exports = {
    getAllPayment,
    createPayment,
    getOnePayement,
    updatePayment,
    deletePayment,
    checkingPayment,
    updatePaymentStatus,
}
