const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: 'dnwsmvmam',
  api_key: '495654979741292',
  api_secret: 'N_5hQmMdBYN4VF0eU4LuGrXnn5E',
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shops',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
})
const parser = multer({ storage: storage })

module.exports = parser
