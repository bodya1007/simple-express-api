const { USER_WAS_DELETED } = require('../../constants/messages')
const { actionsUser, checkingUser } = require('../user.service')
const { OBJECT, STRING, NUMBER } = require('../../../common/constants/data.type')
const { CREATE_USER_VALID_VALUE, GET_USER_VALID_EMAIL, GET_USER_INVALID_EMAIL, GET_USER_VALID_FIRST_NAME, GET_USER_INVALID_VALUES, GET_USER_VALID_ID } = require('../../../common/constants/objects')

describe('testing check email function', () => {
    test('testing with invalid email', async () => {
        let undefinedUser = await checkingUser.checkEmail(GET_USER_INVALID_EMAIL)

        expect(undefinedUser).toBe(false)
    })

    test('testing with valid email', async () => {
        let user = await checkingUser.checkEmail(GET_USER_VALID_EMAIL)

        expect(user).toBe(true)
    })
})
describe('testing check first name function', () => {
    test('testing with valid value', async () => {
        let user = await checkingUser.checkFirstName(GET_USER_VALID_FIRST_NAME)

        expect(user).toBe(true)

    })
})
describe('testing check id function', () => {
    test('testing with valid value', async () => {
        let user = await checkingUser.checkId(GET_USER_VALID_ID)

        expect(user).toBe(true)
    })
    test('testing with invalid value', async () => {
        for (let i = 0; i < GET_USER_INVALID_VALUES.length; i++) {
            let element = GET_USER_INVALID_VALUES[i]
            let user = await checkingUser.checkId(element)

            expect(user).toBe(false)
        }
    })
})
describe('testing get one user function', () => {
    test('testing with valid value', async () => {
        let user = await actionsUser.getOneUser(GET_USER_VALID_ID)

        expect(typeof user).toBe(OBJECT)
        expect(typeof user.id).toBe(NUMBER)
    })
    test('testing with invalid value', async () => {
        for (let i = 0; i < GET_USER_INVALID_VALUES.length; i++) {
            let element = GET_USER_INVALID_VALUES[i]
            let user = await actionsUser.getOneUser(element)

            expect(user).toBeNull()
        }
    })
})
describe('testing get all user function', () => {
    test('testing', async () => {
        let users = await actionsUser.getAllUsers()

        expect(typeof users).toBe(OBJECT)
        if (users.length == 0) {
            expect(users).toBeNull()
        } else {
            users.forEach(user => {
                expect(typeof user).toBe(OBJECT)
                expect(typeof user.first_name).toBe(STRING)
                expect(typeof user.last_name).toBe(STRING)
                expect(typeof user.email).toBe(STRING)
                expect(typeof user.phone).toBe(STRING)
                expect(typeof user.password).toBe(STRING)
                expect(typeof user.createdAt).toBe(OBJECT)
                expect(typeof user.id).toBe(NUMBER)
            });
        }
    })
})
describe('testing create user function', () => {
    test('testing with valid value', async () => {
        let user = await actionsUser.createUser(CREATE_USER_VALID_VALUE)

        expect(typeof user).toBe(OBJECT)
        expect(typeof user.first_name).toBe(STRING)
        expect(typeof user.last_name).toBe(STRING)
        expect(typeof user.email).toBe(STRING)
        expect(typeof user.phone).toBe(STRING)
        expect(typeof user.password).toBe(STRING)
        expect(typeof user.createdAt).toBe(OBJECT)
        expect(typeof user.id).toBe(NUMBER)

        actionsUser.deleteUser(user.id)
    })
})
describe('testing update user function', () => {
    test('testing with valid function', async () => {
        let userBeforeUpdate = await actionsUser.getOneUser(GET_USER_VALID_ID)
        let user = await actionsUser.updateUser(GET_USER_VALID_ID, userBeforeUpdate)

        expect(typeof user).toBe(OBJECT)
        expect(typeof user).toBe(OBJECT)
        expect(typeof user.first_name).toBe(STRING)
        expect(typeof user.last_name).toBe(STRING)
        expect(typeof user.email).toBe(STRING)
        expect(typeof user.phone).toBe(STRING)
        expect(typeof user.password).toBe(STRING)
        expect(typeof user.createdAt).toBe(OBJECT)
        expect(typeof user.id).toBe(NUMBER)
    })
})
describe('testing delete user', () => {
    test('testing with valid value', async () => {
        let user = await actionsUser.createUser(CREATE_USER_VALID_VALUE)
        let answer = await actionsUser.deleteUser(user.id)

        expect(answer).toBe(USER_WAS_DELETED)
    })
})




