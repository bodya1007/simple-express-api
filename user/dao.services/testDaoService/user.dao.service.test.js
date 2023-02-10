const UserDAOService = require('../../dao.services/user.dao.service');
const { USER_WAS_DELETED } = require('../../constants/messages')
const { OBJECT, STRING, NUMBER } = require('../../../common/constants/data.type')
const { CREATE_USER_VALID_VALUE, GET_USER_VALID_EMAIL, GET_USER_INVALID_EMAIL, GET_USER_VALID_FIRST_NAME, GET_USER_VALID_ID, GET_USER_INVALID_VALUES } = require('../../../common/constants/objects')

describe('testing get one user by emai function', () => {
    test('testing with invalid email', async () => {
        let undefinedUser = await UserDAOService.getUserByEmail(GET_USER_INVALID_EMAIL)

        expect(undefinedUser).toBeNull()
    })

    test('testing with valid email', async () => {
        let user = await UserDAOService.getUserByEmail(GET_USER_VALID_EMAIL)

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
describe('testing get user by first name function', () => {
    test('testing with valid value', async () => {
        let user = await UserDAOService.getUserByFirstName(GET_USER_VALID_FIRST_NAME)

        expect(user).toBeDefined()
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
describe('testing get user by id function', () => {
    test('testing with valid value', async () => {
        let user = await UserDAOService.getUserById(GET_USER_VALID_ID)

        expect(typeof user).toBe(OBJECT)
        expect(typeof user.id).toBe(NUMBER)
    })
    test('testing with invalid value', async () => {
        for (let i = 0; i < GET_USER_INVALID_VALUES.length; i++) {
            let element = GET_USER_INVALID_VALUES[i]
            let user = await UserDAOService.getUserById(element)

            expect(user).toBeNull()
        }
    })
})
describe('testing get all user function', () => {
    test('testing', async () => {
        let users = await UserDAOService.getUsers()

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
        let user = await UserDAOService.createUser(CREATE_USER_VALID_VALUE)

        expect(typeof user).toBe(OBJECT)
        expect(typeof user.first_name).toBe(STRING)
        expect(typeof user.last_name).toBe(STRING)
        expect(typeof user.email).toBe(STRING)
        expect(typeof user.phone).toBe(STRING)
        expect(typeof user.password).toBe(STRING)
        expect(typeof user.createdAt).toBe(OBJECT)
        expect(typeof user.id).toBe(NUMBER)

        await UserDAOService.deleteUser(user.id)
    })
})
describe('testing update user function', () => {
    test('testing with valid value', async () => {
        let userBeforeUpdate = await UserDAOService.getUserById(GET_USER_VALID_ID)
        let user = await UserDAOService.updateUser(userBeforeUpdate, userBeforeUpdate)

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
        let user = await UserDAOService.createUser(CREATE_USER_VALID_VALUE)
        let answer = await UserDAOService.deleteUser(user.id)

        expect(answer).toBe(USER_WAS_DELETED)
    })
})


