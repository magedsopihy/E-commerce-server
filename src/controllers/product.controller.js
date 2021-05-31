const Product = require('./../models/product.model')
const errorHandler = require('./../helpers/dbErrorHandler')

const create = async (req, res) => {
  let product = new Product(req.body)
  product.shop = req.shop

  if (req.body.colors) {
    product.colors = JSON.parse(req.body.colors)
  }

  if (req.files) {
    const allImages = []
    for (const file of req.files) {
      const image = {}
      image.name = file.originalname
      image.url = file.path
      allImages.push(image)
    }

    product.images = allImages
  }

  try {
    let result = await product.save()
    res.json(result)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const read = (req, res) => {
  return res.json(req.product)
}

const update = async (req, res) => {
  let product = req.product
  product = Object.assign(product, req.body)

  if (req.body.colors) {
    product.colors = JSON.parse(req.body.colors)
  }

  if (req.files.length > 0) {
    const allImages = []
    for (const file of req.files) {
      const image = {}
      image.name = file.originalname
      image.url = file.path
      allImages.push(image)
    }
    product.images = allImages
  }
  product.updated = Date.now()
  try {
    let result = await product.save()
    res.json(result)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listByShop = async (req, res) => {
  try {
    let products = await Product.find({ shop: req.shop._id }).populate(
      'shop',
      '_id name'
    )
    return res.json(products)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id).populate('shop', '_id name').exec()
    if (!product)
      return res.status('400').json({
        error: 'Product not found',
      })
    req.product = product
    next()
  } catch (err) {
    console.log(err)
    return res.status('400').json({
      error: 'Could not retrieve product',
    })
  }
}

const remove = async (req, res) => {
  try {
    let product = req.product
    let deletedProduct = await product.remove()
    res.json(deletedProduct)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const list = async (req, res) => {
  let query = {}
  if (req.query.name !== undefined) {
    query.name = { $regex: req.query.name, $options: 'i' }
  }
  if (req.query.category && req.query.category != 'all') {
    query.category = req.query.category
  }
  if (req.query.company && req.query.company != 'all') {
    query.company = req.query.company
  }
  if (req.query.price) {
    query.price = { $lte: req.query.price }
  }
  if (req.query.color && req.query.color != 'all') {
    query.colors = { $elemMatch: { color: req.query.color } }
  }
  if (req.query.shipping) {
    const value = req.query.shipping
    if (value === 'true') {
      query.shipping = req.query.shipping
    }
  }

  try {
    const products = await Product.find(query)
      .populate('shop', '_id name')
      .exec()
    return res.json(products)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listCategories = async (req, res) => {
  try {
    let categories = await Product.distinct('category', {})
    console.log(categories)
    res.json(categories)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listColors = async (req, res) => {
  try {
    let colors = await Product.distinct('colors.color', {})
    res.json(colors)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listCompanies = async (req, res) => {
  try {
    let companies = await Product.distinct('company', {})
    res.json(companies)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

module.exports = {
  create,
  listByShop,
  remove,
  productByID,
  update,
  read,
  list,
  listCategories,
  listColors,
  listCompanies,
}
