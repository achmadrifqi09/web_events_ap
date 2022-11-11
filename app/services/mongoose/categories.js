const Category = require('../../api/v1/categories/model')
const { BadRequestError, NotFoundError } = require('../../error')

const getAllCategory = async (req) => {
    const result = await Category.find({ organizer: req.user.organizer })
    return result
}

const createCategory = async (req) => {
    const { name } = req.body

    const checkCategoryName = await Category.findOne({ name: name, organizer: req.user.organizer })

    if (checkCategoryName) throw new BadRequestError('Category name already exist.')

    const result = Category.create({ name: name, organizer: req.user.organizer })
    return result
}

const findOneCategory = async (req) => {
    const { id } = req.params
    const result = await Category.findOne({ _id: id, organizer: req.user.organizer })
    if (!result) throw new NotFoundError(`No category has an id: : ${id}`)

    return result
}

const updateCategory = async (req) => {
    const { id } = req.params
    const name = req.body.name

    const checkCategoryName = await Category.findOne({
        name,
        organizer: req.user.organizer,
        _id: { $ne: id },
    })

    if (checkCategoryName) throw new BadRequestError('Category names should be different')

    const result = Category.findOneAndUpdate({ _id: id }, { name: name }, { new: true, runValidators: true })
    if (!result) throw new NotFoundError(`No category has an id : ${id}`)
    return result
}

const deleteCategory = async (req) => {
    const { id } = req.params
    const result = await Category.findOne({ _id: id, organizer: req.user.organizer })

    if (!result) throw new NotFoundError(`No category has an id : ${id}`)

    await result.remove()
    return result
}

const checkingCategory = async (id) => {
    const result = await Category.findOne({ _id: id })

    if (!result) throw new NotFoundError(`No category has an id : ${id}`)

    return result
}

module.exports = {
    getAllCategory,
    createCategory,
    findOneCategory,
    updateCategory,
    deleteCategory,
    checkingCategory,
}
