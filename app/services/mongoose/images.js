const Image = require('../../api/v1/images/model')
const { NotFoundError } = require('../../error')

const createImage = async (req) => {
    const result = await Image.create({
        urlImage: req.file ? `uploads/${req.file.filename}` : 'uploads/avatar/avatar.png',
    })

    return result
}

const checkingImage = async (id) => {
    const result = await Image.findOne({ _id: id })

    if (!result) throw new NotFoundError(`No image with id : ${id}`)

    return result
}

module.exports = { createImage, checkingImage }
