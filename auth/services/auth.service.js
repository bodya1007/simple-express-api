const jwt = require('jsonwebtoken');
const UserDAOService = require('../../user/dao.services/index');

class AuthService {
    async getToken(req) {
        const { email } = req.body;
        const user = await UserDAOService.getUserByEmail(email);

        return this.generateAccessToken(user._id, user.password);
    }

    generateAccessToken(id, password) {
        const payload = {
            id,
            password
        };

        return jwt.sign(payload, 'secret', { expiresIn: "24h" });
    }
}
module.exports = new AuthService
