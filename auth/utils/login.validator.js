const bcrypt = require('bcryptjs')
const UserDAOService = require('../../user/dao.services/user.dao.service');
const { BAD_REQUEST } = require('../../common/constants/status.code')
const { EMAIL, PASSWORD } = require('../../common/constants/column.name')
const { body, validationResult } = require('express-validator');
const { USER_NOT_CREATED, INCORRECT_PASSWORD } = require('../constants/messages');

class LoginValidator {
    validate(validations) {
        return async (req, res, next) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            const { email, password } = req.body;
            const user = await UserDAOService.getUserByEmail(email);
            const result = this.getValidationResult(errors)

            if (result != 0) {
                return res.status(BAD_REQUEST).json({ msg: result })
            }

            if (user == null) {
                return res.status(BAD_REQUEST).json({ msg: USER_NOT_CREATED })
            }

            const checkPassword = bcrypt.compareSync(password, user.password)

            if (!checkPassword) {
                return res.status(BAD_REQUEST).json({ msg: INCORRECT_PASSWORD })
            }

            return next()
        }
    }

    getValidationResult = (errors) => {
        const result = [];

        errors.errors.forEach(error => {
            if (error.value && error.param == EMAIL) {
                result.push(error);
            }
        })

        return result;
    }
}

const validator = new LoginValidator();

const validateAuth = () => {
    return (
        validator.validate([
            body(EMAIL).isString().isEmail().normalizeEmail(),
            body(PASSWORD).isString(),
        ])
    )
}

module.exports = validateAuth;
