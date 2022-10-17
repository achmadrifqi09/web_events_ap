const Image = require('../../api/v1/images/model')

const createImage = async (req) => {
    const result = await Image.create({
        url_image: req.file ? `uploads/${req.file.filename}` : 'uploads/avatar/avatar.png',
    })

    return result
}

module.exports = { createImage }
