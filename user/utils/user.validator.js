const { checkingUser } = require('../services/index')
const { BAD_REQUEST } = require('../../common/constants/status.code')
const { body, validationResult } = require('express-validator');
const { USER_NOT_FIND, SHOULD_PUT_NUMBER, USER_WITH_THIS_FIRST_NAME_WAS_CREATED, USER_WITH_THIS_EMAIL_WAS_CREATED, MUST_BE_PASSWORD, SET_RIGHT_PHONE_FORMATE } = require('../constants/messages')
const { FIRST_NAME, LAST_NAME, EMAIL, PHONE } = require('../../common/constants/column.name')

class UserValidator {
    validationGetUser = () => {
        return async (req, res, next) => {
            const id = req.params.id
            const result = isNaN(id)

            if (result) {
                return res.status(BAD_REQUEST).json({ msg: SHOULD_PUT_NUMBER })
            }

            return next()
        }
    }
    validationCreateUser = validations => {
        return async (req, res, next) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            const { first_name, email, password } = req.body
            const result = []

            errors.errors.forEach(element => {
                if (element.param == FIRST_NAME && !element.value) {
                    result.push(element)
                }
                if (element.param == LAST_NAME && !element.value) {
                    result.push(element)
                }
                if (element.param == EMAIL) {
                    if (!element.value || element.value == '@') {
                        result.push(element)
                    }
                }
                if (element.param == PHONE) {
                    result.push(element)
                }
            })

            if (result != 0) {
                return res.status(BAD_REQUEST).json(result)
            }

            const checkFirstName = await checkingUser.checkFirstName(first_name)
            const checkEmail = await checkingUser.checkEmail(email)

            if (checkFirstName) {
                return res.status(BAD_REQUEST).json({ msg: USER_WITH_THIS_FIRST_NAME_WAS_CREATED })
            }
            if (checkEmail) {
                return res.status(BAD_REQUEST).json({ msg: USER_WITH_THIS_EMAIL_WAS_CREATED })
            }
            if (!password) {
                return res.status(BAD_REQUEST).json({ msg: MUST_BE_PASSWORD })
            }

            return next();
        };
    }
    validationUpdateUser = validations => {
        return async (req, res, next) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            const { first_name, email } = req.body
            const result = []
            const id = req.params.id
            const answer = isNaN(id)

            if (answer) {
                return res.status(BAD_REQUEST).json({ msg: SHOULD_PUT_NUMBER })
            }

            errors.errors.forEach(element => {
                if (element.param == EMAIL && element.value) {
                    result.push(element)
                }
                if (element.param == PHONE && element.value) {
                    result.push(element)
                }
            })

            if (result != 0) {
                return res.status(BAD_REQUEST).json(result)
            }
            if (first_name != undefined) {
                let checkFirstName = await checkingUser.checkFirstName(first_name)
                if (checkFirstName) {
                    return res.status(BAD_REQUEST).json({ msg: USER_WITH_THIS_FIRST_NAME_WAS_CREATED })
                }
            }
            if (email != undefined) {
                let checkEmail = await checkingUser.checkEmail(email)
                if (checkEmail) {
                    return res.status(BAD_REQUEST).json({ msg: USER_WITH_THIS_EMAIL_WAS_CREATED })
                }
            }

            return next();
        };
    }
    validationDeleteUser = () => {
        return async (req, res, next) => {
            const id = req.params.id
            const result = isNaN(id)

            if (result) {
                return res.status(BAD_REQUEST).json({ msg: SHOULD_PUT_NUMBER })
            }
            let answer = await checkingUser.checkId(id)

            if (!answer) {
                return res.status(BAD_REQUEST).json({ msg: USER_NOT_FIND })
            }

            return next()
        }
    }
}

const userValidator = new UserValidator()
const validateGetUser = () => {
    return (
        userValidator.validationGetUser()
    )
}
const validateCreateUser = () => {
    return (
        userValidator.validationCreateUser([
            body(FIRST_NAME).isString(),
            body(LAST_NAME).isString(),
            body(EMAIL).normalizeEmail().isEmail(),
            body(PHONE).isMobilePhone().withMessage(SET_RIGHT_PHONE_FORMATE)
        ])
    )
}
const validateUpdateUser = () => {
    return (
        userValidator.validationUpdateUser([
            body(FIRST_NAME).isString(),
            body(LAST_NAME).isString(),
            body(EMAIL).isEmail(),
            body(PHONE).isMobilePhone().withMessage(SET_RIGHT_PHONE_FORMATE)
        ])
    )
}
const validateDeleteUser = () => {
    return (
        userValidator.validationDeleteUser()
    )
}

module.exports = { validateUpdateUser, validateCreateUser, validateGetUser, validateDeleteUser }
