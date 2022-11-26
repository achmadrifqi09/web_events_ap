const Participant = require('../../api/v1/participants/model')
const Event = require('../../api/v1/events/model')
const Payment = require('../../api/v1/payments/model')
const { createTokenParticipant, createJWT } = require('../../utils')
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../../error')
const { otpMail, invoiceMail } = require('../mail')
const Order = require('../../api/v1/orders/model')

const singupParticipant = async (req) => {
    const { firstName, lastName, email, password, role } = req.body

    let result = await Participant.findOne({ email, status: 'not active' })

    if (result) {
        result.firstName = firstName
        result.lastName = lastName
        result.email = email
        result.password = password
        result.otp = Math.floor(Math.random() * 9999)
        result.role = role
    } else {
        result = await Participant.create({
            firstName,
            lastName,
            email,
            password,
            role,
            otp: Math.floor(Math.random() * 9999),
        })
    }
    await otpMail(email, result)

    delete result._doc.password
    delete result._doc.otp

    return result
}

const activationParticipant = async (req) => {
    const { email, otp } = req.body

    const checkingParticipant = await Participant.findOne({ email })

    if (!checkingParticipant) {
        throw new NotFoundError('Participant not registered')
    }

    if (checkingParticipant && otp != checkingParticipant.otp) {
        throw new BadRequestError('Please enter the valid registration code')
    }

    const result = await Participant.findByIdAndUpdate(
        checkingParticipant._id,
        { status: 'active' },
        { new: true }
    )

    delete result._doc.password
    delete result._doc.otp
    return result
}

const signinParticipant = async (req) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const result = await Participant.findOne({ email: email })

    if (!result) {
        throw new UnauthorizedError('Invalid Credentials')
    }

    if (result.status === 'not active') {
        throw new UnauthorizedError('Your account is not active')
    }

    const isPasswordCorrect = await result.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials')
    }

    const token = createJWT({ payload: createTokenParticipant(result) })

    return token
}

const getAllEvents = async (req) => {
    const result = await Event.find({ statusEvent: 'Published' })
        .populate('category')
        .populate('image')
        .select('_id title date tickets venueName')

    return result
}

const getEventDetailById = async (req) => {
    const id = req.params.id
    const result = await Event.findOne({ _id: id, statusEvent: 'Published' })

    if (!result) {
        throw new NotFoundError(`No event has an id : ${id}`)
    }

    return result
}

const getAllOrder = async (req) => {
    const result = await Order.find({ participant: req.participant.id })
    return result
}

const checkoutOrer = async (req) => {
    const { event, participantDetail, payment, tickets } = req.body

    const checkingEvent = await Event.findOne({ _id: event })

    if (!checkingEvent) throw new NotFoundError(`No event has an id : ${event}`)

    const checkPayment = Payment.find({ _id: payment, status: true })

    if (!checkPayment) throw new NotFoundError(`No payment has an id : ${payment}`)

    let totalPay = 0,
        totalOrderTicket = 0

    await tickets.forEach((tick) => {
        checkingEvent.tickets.forEach((ticket) => {
            if (tick.ticketCategories.type == ticket.type) {
                if (tick.sumTicket > ticket.stock) {
                    throw new BadRequestError('Not enough remaining tickets')
                } else {
                    ticket.stock -= tick.sumTicket
                    totalOrderTicket += tick.sumTicket
                    totalPay += tick.ticketCategories.price * tick.sumTicket
                }
            }
        })
    })

    await checkingEvent.save()

    const historyEvent = {
        title: checkingEvent.title,
        date: checkingEvent.date,
        about: checkingEvent.about,
        tagline: checkingEvent.tagline,
        keyPoint: checkingEvent.keyPoint,
        venueName: checkingEvent.venueName,
        tickets: tickets,
        image: checkingEvent.image,
        category: checkingEvent.category,
        talent: checkingEvent.talent,
        organizer: checkingEvent.organizer,
    }

    const result = new Order({
        date: new Date(),
        participantDetail: participantDetail,
        totalPay,
        totalOrderTicket,
        orderItems: tickets,
        participant: req.participant.id,
        event,
        historyEvent,
        payment,
    })

    await result.save()
    return result
}

const invoiceParticipant = async (req) => {
    const { id } = req.params
    const checkingOrder = await Order.findOne({
        _id: id,
        status: 'paid',
    })

    if (!checkingOrder) {
        throw new NotFoundError(`No order has an id ${id} or the order status is still 'Pending'`)
    }

    await invoiceMail(checkingOrder.participantDetail.email, checkingOrder)
    return checkingOrder
}

module.exports = {
    singupParticipant,
    activationParticipant,
    signinParticipant,
    getAllEvents,
    getEventDetailById,
    getAllOrder,
    checkoutOrer,
    invoiceParticipant,
}
