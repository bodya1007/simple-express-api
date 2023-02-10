const bcrypt = require('bcryptjs')
const UserDAOService = require('../dao.services/index')

class checkingUserInDataBase {
    async checkFirstName(first_name) {
        let user = await UserDAOService.getUserByFirstName(first_name).then(value => {
            if (value) {
                return true
            } else {
                return false
            }
        })

        return user
    }
    async checkEmail(email) {
        let user = await UserDAOService.getUserByEmail(email).then(value => {
            if (value) {
                return true
            } else {
                return false
            }
        })

        return user
    }
    async checkId(id) {
        let user = await UserDAOService.getUserById(id).then(value => {
            if (value) {
                return true
            } else {
                return false
            }
        })

        return user
    }
}
class actionUser {
    async getOneUser(id) {
        const user = await UserDAOService.getUserById(id)

        return user
    }
    async getAllUsers() {
        const users = await UserDAOService.getUsers()

        return users
    }
    async createUser(model) {
        let password = bcrypt.hashSync(model.password, 8)
        model.password = password
        const user = await UserDAOService.createUser(model)

        return user
    }
    async updateUser(id, model) {
        let user = await UserDAOService.getUserById(id)
        let { first_name, last_name, email, phone, password } = model

        if (!first_name && !user) {
            user = await UserDAOService.updateUser(user, { first_name })
        }
        if (email != '@' && !email && !user) {
            user = await UserDAOService.updateUser(user, { email })
        }
        if (!last_name && !user) {
            user = await UserDAOService.updateUser(user, { last_name })
        }
        if (!phone && !user) {
            user = await UserDAOService.updateUser(user, { phone })
        }
        if (!password && !user) {
            let hashPasword = bcrypt.hashSync(password)
            user = await UserDAOService.updateUser(user, { password: hashPasword })
        }

        return user
    }
    async deleteUser(id) {
        let answer = await UserDAOService.deleteUser(id)

        return answer
    }
}

const actionsUser = new actionUser
const checkingUser = new checkingUserInDataBase

module.exports = { actionsUser, checkingUser }
