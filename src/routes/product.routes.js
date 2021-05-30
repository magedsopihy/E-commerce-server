const express = require('express')
const authCtrl = require('../controllers/auth.controller')
const shopCtrl = require('../controllers/shop.controller')
const productCtrl = require('../controllers/product.controller')
const parser = require('./../../config/cloudinary')

const router = express.Router()

router.route('/api/products').get(productCtrl.list)
router.route('/api/products/categories').get(productCtrl.listCategories)
router.route('/api/products/colors').get(productCtrl.listColors)
router.route('/api/products/company').get(productCtrl.listCompanies)
router
  .route('/api/products/by/:shopId')
  .post(
    authCtrl.requireSignin,
    shopCtrl.isOwner,
    parser.array('image'),
    productCtrl.create
  )
  .get(productCtrl.listByShop)

router
  .route('/api/product/:shopId/:productId')
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, productCtrl.remove)

router.route('/api/products/:productId').get(productCtrl.read)
router
  .route('/api/product/:shopId/:productId')
  .put(
    authCtrl.requireSignin,
    shopCtrl.isOwner,
    parser.array('image'),
    productCtrl.update
  )

// router.route('/api/products/colors').get(productCtrl.colors)

router.param('shopId', shopCtrl.shopByID)
router.param('productId', productCtrl.productByID)

module.exports = router
