const { Router } = require('express');
const AuthController = require('../controllers/index');
const loginValidator = require('../utils/index');

const router = new Router()
router
    .post('/login',
        loginValidator(),
        AuthController.login
    )

module.exports = router