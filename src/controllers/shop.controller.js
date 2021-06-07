const Shop = require('../models/shop.model')
const errorHandler = require('./../helpers/dbErrorHandler')

const create = async (req, res) => {
  let shop = new Shop(req.body)
  shop.owner = req.profile
  shop.image.url = req.file.path
  shop.image.name = req.file.originalname

  try {
    let result = await shop.save()
    res.status(200).json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const shopByID = async (req, res, next, id) => {
  try {
    let shop = await Shop.findById(id).populate('owner', '_id name').exec()
    if (!shop) {
      return res.status('400').json({
        error: 'Shop not found',
      })
    }
    req.shop = shop
    next()
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve shop',
    })
  }
}

const read = (req, res) => {
  return res.json(req.shop)
}

const update = async (req, res) => {
  console.log(req.body)
  let shop = req.shop
  shop = Object.assign(shop, req.body)
  if (req.file) {
    shop.image.url = req.file.path
    shop.image.name = req.file.originalname
  }

  shop.updated = Date.now()

  try {
    let result = await shop.save()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const remove = async (req, res) => {
  try {
    let shop = req.shop
    let deletedShop = shop.remove()
    res.json(deletedShop)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const list = async (req, res) => {
  try {
    let shops = await Shop.find()
    res.json(shops)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const listByOwner = async (req, res) => {
  try {
    let shops = await Shop.find({ owner: req.profile._id }).populate(
      'owner',
      '_id name'
    )

    res.json(shops)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    })
  }
}

const isOwner = (req, res, next) => {
  const isOwner = req.shop && req.auth && req.shop.owner._id == req.auth._id
  if (!isOwner) {
    return res.status('403').json({
      error: 'User is not authorized',
    })
  }
  next()
}

module.exports = {
  create,
  shopByID,
  list,
  listByOwner,
  read,
  update,
  isOwner,
  remove,
}
