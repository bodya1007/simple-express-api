const UserController = require('../controllers/index')
const { Router } = require('express')
const { validateUpdateUser, validateCreateUser, validateGetUser, validateDeleteUser } = require('../utils/index')

const router = new Router()

router
    .get('/user',
        UserController.getAllUsers
    )
    .get('/user/:id',
        validateGetUser(),
        UserController.getOneUser
    )
    .post('/user',
        validateCreateUser(),
        UserController.createUser
    )
    .put('/user/:id',
        validateUpdateUser(),
        UserController.updateUser
    )
    .delete('/user/:id',
        validateDeleteUser(),
        UserController.deleteUser
    )

module.exports = router