const express = require('express')
const authCtrl = require('../controllers/auth.controller')
const userCtrl = require('../controllers/user.controller')
const shopCtrl = require('../controllers/shop.controller')
const parser = require('../../config/cloudinary')

const router = express.Router()

router
  .route('/api/shops/by/:userId')
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    parser.single('image'),
    shopCtrl.create
  )
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, shopCtrl.listByOwner)

router.route('/api/shops/logo/:shopId').get(shopCtrl.photo)

router.route('/api/shop/:shopId').get(shopCtrl.read)

router
  .route('/api/shops/:shopId')
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)
  .put(
    authCtrl.requireSignin,
    shopCtrl.isOwner,
    parser.single('image'),
    shopCtrl.update
  )

router.route('/api/shops').get(shopCtrl.list)

router.param('userId', userCtrl.userByID)
router.param('shopId', shopCtrl.shopByID)

module.exports = router
