const authService = require('../services/index');

class AuthController {
    async login(req, res) {
        const token = await authService.getToken(req);

        return res.json({ token });
    }
}

module.exports = new AuthController
