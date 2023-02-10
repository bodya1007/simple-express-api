const { actionsUser } = require('../services/index')
const { SUCCESSFUL_REQUEST, CREATED } = require('../../common/constants/status.code')

class UserController {
    async getOneUser(req, res) {
        let id = req.params.id``
        const user = await actionsUser.getOneUser(id)
    
        return res.json(user)

    }
    async getAllUsers(req, res) {
        const users = await actionsUser.getAllUsers()

        return res.json(users)
    }
    async createUser(req, res) {
        const model = req.body
        const user = await actionsUser.createUser(model)

        return res.status(CREATED).json(user)
    }
    async updateUser(req, res) {
        let id = req.params.id
        let model = req.body
        const user = await actionsUser.updateUser(id, model)

        return res.json(user)
    }
    async deleteUser(req, res) {
        let id = req.params.id
        const answer = await actionsUser.deleteUser(id)

        return res.status(SUCCESSFUL_REQUEST).json({ msg: answer })
    }
}

module.exports = new UserController