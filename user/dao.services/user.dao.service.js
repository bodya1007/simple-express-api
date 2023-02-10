const User = require('../models/user.model')
const {USER_WAS_DELETED} = require('../constants/messages')

class UserDAOService{
    async getUserById(id) {
        const user = await User.findOne({where:{id:id}});

        return user;
    }
    async getUserByFirstName(first_name) {
        const user = await User.findOne({where:{first_name:first_name}});

        return user;
    }
    async getUserByEmail(email) {
        const user = await User.findOne({where:{email:email}});

        return user;
    }
    async getUsers() {
        const users = await User.findAll();

        return users;
    }
    async createUser(model) {
        const user = await User.create(model);

        return user;
    }
    async updateUser(user, model) {
        user.update(model);

        return user;
    }
    async deleteUser(id) {
        await User.destroy({ where: { id: id } });

        return USER_WAS_DELETED;
    }
}

module.exports = new UserDAOService

