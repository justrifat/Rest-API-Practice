const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const userController = require('../controller/user')


router.post('/login', userController.loginController)

router.post('/register', userController.registerController)

router.get('/', authenticate, userController.getAllUser)

module.exports = router